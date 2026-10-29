import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function authenticatedClient() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return error || !user ? null : supabase;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Đăng nhập để xem dữ liệu hiện tại." }, { status: 401 });
}
