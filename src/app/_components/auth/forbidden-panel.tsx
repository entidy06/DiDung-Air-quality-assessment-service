"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function ForbiddenPanel() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  const signOut = async () => {
    setSigningOut(true);
    setError("");
    const result = await useAuthStore.getState().signOut();
    if (result.error) {
      setError(result.error);
      setSigningOut(false);
      return;
    }
    router.replace("/");
    router.refresh();
  };

  return <main id="main-content" className="forbidden-shell">
    <section className="forbidden-card" aria-labelledby="forbidden-title">
      <span className="forbidden-code">403</span>
      <Link className="forbidden-brand" href="/app">DiDung</Link>
      <p className="admin-eyebrow">Giới hạn quyền truy cập</p>
      <h1 id="forbidden-title">Bạn không có quyền vào khu vực quản trị.</h1>
      <p>Tài khoản này đã đăng nhập và vẫn có thể sử dụng user site. Chỉ tài khoản được chọn làm admin mới mở được khu vực quản trị.</p>
      <div className="forbidden-actions">
        <Link className="admin-button admin-primary" href="/app">Về user site</Link>
        <button className="admin-button" type="button" onClick={() => void signOut()} disabled={signingOut}>{signingOut ? "Đang đăng xuất…" : "Đăng xuất"}</button>
      </div>
      {error && <p className="admin-error" role="alert">{error}</p>}
    </section>
  </main>;
}
