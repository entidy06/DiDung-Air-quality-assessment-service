import { NextResponse } from "next/server";
import { authenticatedClient, unauthorizedResponse } from "@/lib/api/require-user";

// Phục vụ biểu đồ xu hướng (hướng C) — MVP dùng trực tiếp phần dự báo đã có sẵn
// trong air_quality_model (Open-Meteo trả sẵn cả giờ tương lai trong cùng 1 series,
// không cần bảng forecasts riêng — xem docs/specs/2026-10-22-backend-schema.md mục 4.4).
export async function GET(request: Request) {
  const supabase = await authenticatedClient();
  if (!supabase) return unauthorizedResponse();
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get("locationId");
  if (!locationId) {
    return NextResponse.json({ error: "Thiếu locationId" }, { status: 400 });
  }
  const hours = Math.min(Number(searchParams.get("hours") ?? 24), 72);

  const now = new Date();
  const to = new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("air_quality_model")
    .select("valid_at, pm2_5, european_aqi, us_aqi")
    .eq("location_id", locationId)
    .gt("valid_at", now.toISOString())
    .lte("valid_at", to)
    .order("valid_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data_type: "modeled", items: data });
}
