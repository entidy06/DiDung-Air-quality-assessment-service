import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardExperience } from "../_components/experience/dashboard-experience";

export const metadata: Metadata = { title: "Điều kiện hôm nay" };

export default async function AppPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");
  return <DashboardExperience />;
}
