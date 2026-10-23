import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const update: { threshold_value?: number; is_active?: boolean } = {};
  if (typeof body.threshold_value === "number") update.threshold_value = body.threshold_value;
  if (typeof body.is_active === "boolean") update.is_active = body.is_active;
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Không có trường nào để cập nhật" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("alert_thresholds")
    .update(update)
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id, location_id, metric, threshold_value, is_active, created_at")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Không tìm thấy ngưỡng này" }, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("alert_thresholds")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
