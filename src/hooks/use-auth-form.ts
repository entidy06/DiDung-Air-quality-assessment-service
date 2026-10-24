"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { AUTH_LANDING } from "@/lib/auth-navigation";
export function useAuthForm() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const loading = useAuthStore(state => state.loading);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { if (user) router.replace(AUTH_LANDING); }, [user, router]);
  const changeMode = (next: "login" | "signup") => { setMode(next); setPassword(""); setError(""); setMessage(""); };
  const submit = async () => {
    if (pending) return;
    setPending(true); setError(""); setMessage("");
    const auth = useAuthStore.getState();
    if (mode === "signup") {
      const result = await auth.signUp(email.trim(), password);
      if (result.error) setError(result.error);
      else if (!result.signedIn) { setPassword(""); setMessage("Kiểm tra email để xác nhận tài khoản. Sau đó bạn có thể đăng nhập."); }
    } else { const result = await auth.signInWithPassword(email.trim(), password); if (result.error) setError(result.error); }
    setPending(false);
  };
  const google = async () => {
    if (pending) return;
    setPending(true); setError("");
    const result = await useAuthStore.getState().signInWithGoogle();
    if (result.error) { setError(result.error); setPending(false); }
  };
  return { mode, changeMode, email, setEmail, password, setPassword, pending, message, error, loading, submit, google };
}
