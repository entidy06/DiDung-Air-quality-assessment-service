import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchWeatherForLocations, toUtcIso } from "@/lib/open-meteo";

// Trigger bởi pg_cron + pg_net (xem supabase/migrations/..._setup_cron_sync_trigger.sql),
// toàn bộ logic nghiệp vụ nằm ở đây (tầng Model, MVVM — AGENTS.md §3), không ở Postgres.
export const maxDuration = 60;

export async function POST(request: Request) {
  const secret = request.headers.get("x-cron-secret");
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const startedAt = new Date().toISOString();

  const { data: locations, error: locationsError } = await supabase
    .from("locations")
    .select("id, latitude, longitude")
    .eq("is_active", true);

  if (locationsError || !locations) {
    await supabase.from("data_sync_log").insert({
      source: "open-meteo-weather",
      started_at: startedAt,
      finished_at: new Date().toISOString(),
      status: "failed",
      records_synced: 0,
      error_message: locationsError?.message ?? "Không lấy được danh sách locations",
    });
    return NextResponse.json({ error: "Không lấy được danh sách locations" }, { status: 500 });
  }

  let recordsSynced = 0;
  let errorMessage: string | null = null;

  try {
    const results = await fetchWeatherForLocations(locations);

    // Toàn bộ dữ liệu từ Open-Meteo là mô hình (không có nhánh "đo tại trạm" ở MVP,
    // xem docs/specs/2026-10-22-backend-schema.md mục 3.2) -> is_forecast luôn true,
    // giúp unique constraint (location_id, valid_at, is_forecast) ổn định qua các lần sync
    // (không đổi giá trị is_forecast giữa các lần chạy -> upsert luôn update đúng dòng cũ).
    const rows = results.flatMap(({ locationId, hourly }) =>
      hourly.time.map((time, idx) => ({
        location_id: locationId,
        valid_at: toUtcIso(time),
        is_forecast: true,
        precipitation: hourly.precipitation?.[idx] ?? null,
        precipitation_probability: hourly.precipitation_probability?.[idx] ?? null,
        relative_humidity: hourly.relative_humidity_2m?.[idx] ?? null,
        wind_speed: hourly.wind_speed_10m?.[idx] ?? null,
        wind_direction: hourly.wind_direction_10m?.[idx] ?? null,
        uv_index: hourly.uv_index?.[idx] ?? null,
        sunshine_duration: hourly.sunshine_duration?.[idx] ?? null,
        source: "open-meteo",
      })),
    );

    if (rows.length > 0) {
      const { error: upsertError } = await supabase
        .from("weather_data")
        .upsert(rows, { onConflict: "location_id,valid_at,is_forecast" });
      if (upsertError) throw upsertError;
    }
    recordsSynced = rows.length;
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : String(err);
  }

  await supabase.from("data_sync_log").insert({
    source: "open-meteo-weather",
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
