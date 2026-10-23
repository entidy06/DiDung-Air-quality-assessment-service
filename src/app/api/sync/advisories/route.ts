import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { aqiToLevel, type AirQualityLevel } from "@/lib/air-quality";
import {
  rainProbabilityBucket,
  uvIndexBucket,
  type RainProbabilityBucket,
  type UvIndexBucket,
} from "@/lib/weather";
import { generateAdvisory, ADVISORY_PROMPT_VERSION } from "@/lib/ninerouter";

// Trigger bởi pg_cron + pg_net. Logic nghiệp vụ nằm ở đây (tầng Model, MVVM).
// Gom nhóm theo tổ hợp (air_quality_level, rain_bucket, uv_bucket) trước khi gọi LLM —
// AQI gần như đồng nhất toàn TP.HCM (ô lưới ~45km) nhưng thời tiết biến đổi mịn hơn
// (~10km), nên không thể chỉ gom theo AQI như trước (sẽ gán sai thời tiết của 1
// location đại diện cho cả nhóm). Vẫn giảm được rất nhiều so với gọi 168 lần/giờ.
export const maxDuration = 60;

type CurrentReading = {
  locationId: string;
  validAt: string;
  pm25: number | null;
  usAqi: number | null;
  precipitation: number | null;
  precipitationProbability: number | null;
  uvIndex: number | null;
  sunshineDuration: number | null;
  level: AirQualityLevel;
  rainBucket: RainProbabilityBucket;
  uvBucket: UvIndexBucket;
};

function groupKey(r: CurrentReading): string {
  return `${r.level}|${r.rainBucket}|${r.uvBucket}`;
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-cron-secret");
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const startedAt = new Date().toISOString();
  const now = new Date();
  const windowStart = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();

  let recordsSynced = 0;
  let errorMessage: string | null = null;

  try {
    const [{ data: aqRows, error: aqError }, { data: weatherRows, error: weatherError }] =
      await Promise.all([
        supabase
          .from("air_quality_model")
          .select("location_id, valid_at, pm2_5, us_aqi")
          .gte("valid_at", windowStart)
          .lte("valid_at", now.toISOString())
          .order("valid_at", { ascending: false }),
        supabase
          .from("weather_data")
          .select("location_id, valid_at, precipitation, precipitation_probability, uv_index, sunshine_duration")
          .gte("valid_at", windowStart)
          .lte("valid_at", now.toISOString())
          .order("valid_at", { ascending: false }),
      ]);

    if (aqError) throw aqError;
    if (weatherError) throw weatherError;

    // Lấy dòng mới nhất mỗi location (đã order desc -> dòng đầu tiên gặp là mới nhất)
    const latestAq = new Map<string, { valid_at: string; pm2_5: number | null; us_aqi: number | null }>();
    for (const row of aqRows ?? []) {
      if (!latestAq.has(row.location_id)) {
        latestAq.set(row.location_id, row);
      }
    }
    type WeatherRow = {
      precipitation: number | null;
      precipitation_probability: number | null;
      uv_index: number | null;
      sunshine_duration: number | null;
    };
    const latestWeather = new Map<string, WeatherRow>();
    for (const row of weatherRows ?? []) {
      if (!latestWeather.has(row.location_id)) {
        latestWeather.set(row.location_id, row);
      }
    }

    const readings: CurrentReading[] = [];
    for (const [locationId, aq] of latestAq) {
      const w = latestWeather.get(locationId);
      const precipitationProbability = w?.precipitation_probability ?? null;
      const uvIndex = w?.uv_index ?? null;
      readings.push({
        locationId,
        validAt: aq.valid_at,
        pm25: aq.pm2_5,
        usAqi: aq.us_aqi,
        precipitation: w?.precipitation ?? null,
        precipitationProbability,
        uvIndex,
        sunshineDuration: w?.sunshine_duration ?? null,
        level: aqiToLevel(aq.us_aqi),
        rainBucket: rainProbabilityBucket(precipitationProbability),
        uvBucket: uvIndexBucket(uvIndex),
      });
    }

    // Gom nhóm theo tổ hợp (level, rainBucket, uvBucket) — chỉ gọi LLM 1 lần/tổ hợp
    // duy nhất xuất hiện trong lần sync này, không phải 1 lần/location.
    const groups = new Map<string, CurrentReading[]>();
    for (const r of readings) {
      const key = groupKey(r);
      const arr = groups.get(key) ?? [];
      arr.push(r);
      groups.set(key, arr);
    }

    const rows: {
      location_id: string;
      valid_at: string;
      air_quality_level: AirQualityLevel;
      summary: string;
      action: string;
      note: string | null;
      model: string;
      prompt_version: string;
    }[] = [];

    for (const group of groups.values()) {
      const representative = group[0];
      const { summary, action, note, model } = await generateAdvisory({
        level: representative.level,
        pm25: representative.pm25,
        usAqi: representative.usAqi,
        rainBucket: representative.rainBucket,
        precipitationProbability: representative.precipitationProbability,
        precipitation: representative.precipitation,
        uvBucket: representative.uvBucket,
        uvIndex: representative.uvIndex,
        sunshineMinutes:
          representative.sunshineDuration !== null ? Math.round(representative.sunshineDuration / 60) : null,
      });

      for (const r of group) {
        rows.push({
          location_id: r.locationId,
          valid_at: r.validAt,
          air_quality_level: r.level,
          summary,
          action,
          note,
          model,
          prompt_version: ADVISORY_PROMPT_VERSION,
        });
      }
    }

    if (rows.length > 0) {
      const { error: upsertError } = await supabase
        .from("advisories")
        .upsert(rows, { onConflict: "location_id,valid_at" });
      if (upsertError) throw upsertError;
    }
    recordsSynced = rows.length;
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : String(err);
  }

  await supabase.from("data_sync_log").insert({
    source: "9router-advisories",
    started_at: startedAt,
    finished_at: new Date().toISOString(),
    status: errorMessage ? "failed" : "success",
    records_synced: recordsSynced,
    error_message: errorMessage,
  });

  if (errorMessage) {
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
  return NextResponse.json({ ok: true, records_synced: recordsSynced });
}
