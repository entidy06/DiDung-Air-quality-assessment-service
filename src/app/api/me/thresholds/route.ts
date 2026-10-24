import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("alert_thresholds")
    .select("id, location_id, metric, threshold_value, is_active, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { location_id, metric, threshold_value } = body;
  if (!location_id || !["pm25", "aqi"].includes(metric) || typeof threshold_value !== "number") {
    return NextResponse.json(
      { error: "Thiếu hoặc sai location_id / metric (pm25|aqi) / threshold_value" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("alert_thresholds")
    .insert({ user_id: user.id, location_id, metric, threshold_value })
    .select("id, location_id, metric, threshold_value, is_active, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
