import { NextResponse } from "next/server";
import { authenticatedClient, unauthorizedResponse } from "@/lib/api/require-user";

export async function GET(request: Request) {
  const supabase = await authenticatedClient();
  if (!supabase) return unauthorizedResponse();
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get("locationId");
  if (!locationId) {
    return NextResponse.json({ error: "Thiếu locationId" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("air_quality_model")
    .select("valid_at, pm2_5, european_aqi, us_aqi, source, fetched_at")
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

  // MVP chỉ dùng Open-Meteo (mô hình) — không có nhánh "đo tại trạm" thật, xem
  // docs/specs/2026-10-22-backend-schema.md mục 3.2. Trả data_type rõ ràng để UI không
  // ngụ ý đây là số đo thật.
  return NextResponse.json({ ...data, data_type: "modeled" });
}
