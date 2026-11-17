import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/app/_components/admin/admin-shell";
import { getViewer } from "@/lib/auth/authorization";

export const metadata: Metadata = { title: "Quản trị" };

export default async function AdminPage() {
  const viewer = await getViewer();
  if (!viewer.user) redirect("/auth?next=/admin");
  if (viewer.role !== "admin") redirect("/forbidden");

  const name = viewer.user.user_metadata?.full_name || viewer.user.email || "Quản trị viên";
  return <AdminShell name={name} />;
}
