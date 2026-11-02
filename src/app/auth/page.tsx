import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "../_components/live/login-form";
import { authFailureMessage, defaultPathForRole, safeAuthRequestPath } from "@/lib/auth-navigation";
import { getViewer } from "@/lib/auth/authorization";

export const metadata: Metadata = { title: "Đăng nhập" };

export default async function AuthPage({ searchParams }: { searchParams: Promise<{ auth_error?: string; auth_error_code?: string; error?: string; error_code?: string; next?: string }> }) {
  const viewer = await getViewer();
  if (viewer.role) redirect(defaultPathForRole(viewer.role));
  const query = await searchParams;
  const callbackError = query.auth_error === "1" || query.error ? authFailureMessage(query.auth_error_code ?? query.error_code) : "";
  const nextPath = safeAuthRequestPath(query.next);
  return <main id="main-content" className="exp-auth-shell">
    <section className="exp-auth-story">
      <Link className="exp-brand" href="/">DiDung</Link>
      <div><h1>Thêm bối cảnh cho mỗi lần ra ngoài.</h1><p>Đăng nhập để xem dữ liệu hiện tại, xu hướng và ngưỡng bạn đã chọn.</p></div>
      <Link className="exp-back" href="/">← Quay lại giới thiệu</Link>
    </section>
    <div className="exp-auth-column"><LoginForm callbackError={callbackError} nextPath={nextPath ?? undefined} /></div>
  </main>;
}
