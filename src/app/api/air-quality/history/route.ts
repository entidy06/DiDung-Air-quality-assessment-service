import { NextResponse } from "next/server";
import { authenticatedClient, unauthorizedResponse } from "@/lib/api/require-user";

// Phục vụ biểu đồ xu hướng (hướng C) — chỉ trả các mốc valid_at trong quá khứ.
// Mặc định 24h gần nhất nếu không truyền from/to.
export async function GET(request: Request) {
  const supabase = await authenticatedClient();
  if (!supabase) return unauthorizedResponse();
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get("locationId");
  if (!locationId) {
    return NextResponse.json({ error: "Thiếu locationId" }, { status: 400 });
  }

  const now = new Date();
  const from = searchParams.get("from") ?? new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const to = searchParams.get("to") ?? now.toISOString();

  const { data, error } = await supabase
    .from("air_quality_model")
    .select("valid_at, pm2_5, european_aqi, us_aqi")
    .eq("location_id", locationId)
    .gte("valid_at", from)
    .lte("valid_at", to)
    .order("valid_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data_type: "modeled", items: data });
}
