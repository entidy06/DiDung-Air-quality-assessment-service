import type { Metadata } from "next";
import { LoginForm } from "../_components/live/login-form";
import { authFailureMessage } from "@/lib/auth-navigation";
export const metadata: Metadata = { title: "Đăng nhập" };
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ auth_error?: string; auth_error_code?: string; error?: string; error_code?: string }> }) {
  const query = await searchParams;
  return <main id="main-content">
    <h1 className="sr-only">Đăng nhập</h1>
    <LoginForm callbackError={query.auth_error === "1" || query.error ? authFailureMessage(query.auth_error_code ?? query.error_code) : ""} />
  </main>;
}
