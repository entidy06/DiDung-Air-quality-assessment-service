import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchAirQualityForLocations, toUtcIso } from "@/lib/open-meteo";

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
      source: "open-meteo-air-quality",
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
    const results = await fetchAirQualityForLocations(locations);

    const rows = results.flatMap(({ locationId, hourly }) =>
      hourly.time.map((time, idx) => ({
        location_id: locationId,
        valid_at: toUtcIso(time),
        pm2_5: hourly.pm2_5?.[idx] ?? null,
        european_aqi: hourly.european_aqi?.[idx] ?? null,
        us_aqi: hourly.us_aqi?.[idx] ?? null,
        source: "open-meteo",
      })),
    );

    if (rows.length > 0) {
      const { error: upsertError } = await supabase
        .from("air_quality_model")
        .upsert(rows, { onConflict: "location_id,valid_at" });
      if (upsertError) throw upsertError;
    }
    recordsSynced = rows.length;
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : String(err);
  }

  await supabase.from("data_sync_log").insert({
    source: "open-meteo-air-quality",
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
