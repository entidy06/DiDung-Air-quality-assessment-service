import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getViewer } from "@/lib/auth/authorization";
import { DashboardExperience } from "../_components/experience/dashboard-experience";

export const metadata: Metadata = { title: "Điều kiện hôm nay" };

export default async function AppPage() {
  const viewer = await getViewer();
  if (!viewer.user) redirect("/auth?next=/app");
  return <DashboardExperience />;
}
