import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { aqiToLevel } from "@/lib/air-quality";

// Phục vụ bản đồ (hướng B) — 1 lần gọi trả AQI hiện tại của toàn bộ location đang active,
// tránh để frontend phải gọi /api/air-quality/current cho từng location (168 lần).
export async function GET() {
  const supabase = await createClient();
  const now = new Date();
  const windowStart = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();

  const [{ data: locations, error: locationsError }, { data: aqRows, error: aqError }] =
    await Promise.all([
      supabase
        .from("locations")
        .select("id, name, slug, latitude, longitude")
        .eq("is_active", true),
      supabase
        .from("air_quality_model")
        .select("location_id, valid_at, pm2_5, us_aqi")
        .gte("valid_at", windowStart)
        .lte("valid_at", now.toISOString())
        .order("valid_at", { ascending: false }),
    ]);

  if (locationsError) {
    return NextResponse.json({ error: locationsError.message }, { status: 500 });
  }
  if (aqError) {
    return NextResponse.json({ error: aqError.message }, { status: 500 });
  }

  const latestByLocation = new Map<
    string,
    { valid_at: string; pm2_5: number | null; us_aqi: number | null }
  >();
  for (const row of aqRows ?? []) {
    if (!latestByLocation.has(row.location_id)) {
      latestByLocation.set(row.location_id, row);
    }
  }

  const items = (locations ?? []).map((loc) => {
    const reading = latestByLocation.get(loc.id);
    return {
      location_id: loc.id,
      name: loc.name,
      slug: loc.slug,
      latitude: loc.latitude,
      longitude: loc.longitude,
      valid_at: reading?.valid_at ?? null,
      pm2_5: reading?.pm2_5 ?? null,
      us_aqi: reading?.us_aqi ?? null,
      level: reading ? aqiToLevel(reading.us_aqi) : null,
    };
  });

  return NextResponse.json({ data_type: "modeled", items });
}
