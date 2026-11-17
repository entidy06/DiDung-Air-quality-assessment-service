import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ForbiddenPanel } from "@/app/_components/auth/forbidden-panel";
import { getViewer } from "@/lib/auth/authorization";

export const metadata: Metadata = { title: "Không có quyền truy cập" };

export default async function ForbiddenPage() {
  const viewer = await getViewer();
  if (!viewer.user) redirect("/auth");
  if (viewer.role === "admin") redirect("/admin");

  return <ForbiddenPanel />;
}
