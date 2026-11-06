"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
export function useAuthForm(nextPath?: string) {
  const router = useRouter();
  const loading = useAuthStore(state => state.loading);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const completeSignIn = () => {
    const params = new URLSearchParams({ complete: "1" });
    if (nextPath) params.set("next", nextPath);
    router.replace(`/auth?${params}`);
    router.refresh();
  };
  const changeMode = (next: "login" | "signup") => { setMode(next); setPassword(""); setError(""); setMessage(""); };
  const submit = async () => {
    if (pending) return;
    setPending(true); setError(""); setMessage("");
    const auth = useAuthStore.getState();
    if (mode === "signup") {
      const result = await auth.signUp(email.trim(), password);
      if (result.error) setError(result.error);
      else if (result.signedIn) completeSignIn();
      else if (!result.signedIn) { setPassword(""); setMessage("Kiểm tra email để xác nhận tài khoản. Sau đó bạn có thể đăng nhập."); }
    } else { const result = await auth.signInWithPassword(email.trim(), password); if (result.error) setError(result.error); else completeSignIn(); }
    setPending(false);
  };
  const google = async () => {
    if (pending) return;
    setPending(true); setError("");
    const result = await useAuthStore.getState().signInWithGoogle(nextPath);
    if (result.error) { setError(result.error); setPending(false); }
  };
  return { mode, changeMode, email, setEmail, password, setPassword, pending, message, error, loading, submit, google };
}
