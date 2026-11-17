import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Trigger bởi pg_cron + pg_net (xem supabase/migrations/*_add_evaluate_alerts_cron.sql).
// So khớp từng alert_thresholds đang active với dòng air_quality_model mới nhất của
// location đó, tạo notifications nếu vượt ngưỡng. dedup_key = "<threshold_id>:<ngày>"
// để mỗi ngưỡng chỉ bắn tối đa 1 thông báo/ngày (upsert + ignoreDuplicates bỏ qua trùng).
export const maxDuration = 60;

export async function POST(request: Request) {
  const secret = request.headers.get("x-cron-secret");
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const startedAt = new Date().toISOString();
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);
  const windowStart = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();

  let recordsSynced = 0;
  let errorMessage: string | null = null;

  try {
    const { data: thresholds, error: thresholdsError } = await supabase
      .from("alert_thresholds")
      .select("id, user_id, location_id, metric, threshold_value")
      .eq("is_active", true);

    if (thresholdsError) throw thresholdsError;

    const locationIds = [...new Set((thresholds ?? []).map((t) => t.location_id))];

    const latestByLocation = new Map<
      string,
      { valid_at: string; pm2_5: number | null; us_aqi: number | null }
    >();

    if (locationIds.length > 0) {
      const { data: aqRows, error: aqError } = await supabase
        .from("air_quality_model")
        .select("location_id, valid_at, pm2_5, us_aqi")
        .in("location_id", locationIds)
        .gte("valid_at", windowStart)
        .lte("valid_at", now.toISOString())
        .order("valid_at", { ascending: false });

      if (aqError) throw aqError;

      for (const row of aqRows ?? []) {
        if (!latestByLocation.has(row.location_id)) {
          latestByLocation.set(row.location_id, row);
        }
      }
    }

    const rows: {
      user_id: string;
      threshold_id: number;
      location_id: string;
      metric: string;
      metric_value: number;
      title: string;
      body: string;
      dedup_key: string;
    }[] = [];

    for (const threshold of thresholds ?? []) {
      const reading = latestByLocation.get(threshold.location_id);
      if (!reading) continue;

      const value = threshold.metric === "pm25" ? reading.pm2_5 : reading.us_aqi;
      if (value === null || value === undefined) continue;
      if (value < threshold.threshold_value) continue;

      const metricLabel = threshold.metric === "pm25" ? "PM2.5" : "AQI";
      rows.push({
        user_id: threshold.user_id,
        threshold_id: threshold.id,
        location_id: threshold.location_id,
        metric: threshold.metric,
        metric_value: value,
        title: `${metricLabel} vượt ngưỡng bạn đặt`,
        body: `Chỉ số ${metricLabel} hiện tại là ${value}, vượt ngưỡng ${threshold.threshold_value} bạn đã thiết lập.`,
        dedup_key: `${threshold.id}:${todayKey}`,
      });
    }

    if (rows.length > 0) {
      const { error: insertError } = await supabase
        .from("notifications")
        .upsert(rows, { onConflict: "dedup_key", ignoreDuplicates: true });
      if (insertError) throw insertError;
    }
    recordsSynced = rows.length;
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : String(err);
  }

  await supabase.from("data_sync_log").insert({
    source: "evaluate-alerts",
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
