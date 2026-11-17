import { NextResponse } from "next/server";
import { authenticatedClient, unauthorizedResponse } from "@/lib/api/require-user";

export async function GET() {
  const supabase = await authenticatedClient();
  if (!supabase) return unauthorizedResponse();
  const { data, error } = await supabase
    .from("locations")
    .select("id, name, slug, latitude, longitude")
    .eq("is_active", true)
    .order("name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ locations: data });
}
