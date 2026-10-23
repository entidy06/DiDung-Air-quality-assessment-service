import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get("locationId");
  if (!locationId) {
    return NextResponse.json({ error: "Thiếu locationId" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("weather_data")
    .select(
      "valid_at, precipitation, precipitation_probability, relative_humidity, wind_speed, wind_direction, uv_index, sunshine_duration, source, fetched_at",
    )
    .eq("location_id", locationId)
    .lte("valid_at", new Date().toISOString())
    .order("valid_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Chưa có dữ liệu cho location này" }, { status: 404 });
  }
  return NextResponse.json(data);
}
