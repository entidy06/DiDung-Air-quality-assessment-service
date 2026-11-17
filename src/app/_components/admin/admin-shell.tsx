"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function AdminShell({ name }: { name: string }) {
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

  return <main id="main-content" className="admin-shell">
    <aside className="admin-sidebar">
      <div className="admin-brand-lockup">
        <Link className="admin-brand" href="/admin">DiDung</Link>
        <span className="admin-role-stamp">ADMIN</span>
      </div>
      <nav className="admin-nav" aria-label="Điều hướng quản trị">
        <Link href="/admin" aria-current="page">Tổng quan</Link>
        <span>Người dùng <small>Sắp có</small></span>
        <span>Dữ liệu <small>Sắp có</small></span>
        <span>Đồng bộ <small>Sắp có</small></span>
        <span>Cấu hình <small>Sắp có</small></span>
      </nav>
      <div className="admin-account">
        <p>{name}</p>
        <button type="button" onClick={() => void signOut()} disabled={signingOut}>{signingOut ? "Đang đăng xuất…" : "Đăng xuất"}</button>
        {error && <p className="admin-error" role="alert">{error}</p>}
      </div>
    </aside>

    <section className="admin-content">
      <header className="admin-topline">
        <div>
          <p className="admin-eyebrow">Khu vực quản trị</p>
          <h1>Tổng quan</h1>
        </div>
        <p>Không gian riêng dành cho tài khoản được chọn quản trị DiDung.</p>
      </header>

      <section className="admin-welcome" aria-labelledby="admin-welcome-title">
        <div>
          <p className="admin-eyebrow">Quyền đã xác minh</p>
          <h2 id="admin-welcome-title">Xin chào, {name}.</h2>
          <p>Khu vực quản trị đang được chuẩn bị. Các chức năng quản lý người dùng, dữ liệu và đồng bộ sẽ được bổ sung theo từng giai đoạn đã duyệt.</p>
          <div className="admin-actions">
            <Link className="admin-button admin-primary" href="/app">Xem user site</Link>
            <button className="admin-button" type="button" onClick={() => void signOut()} disabled={signingOut}>{signingOut ? "Đang đăng xuất…" : "Đăng xuất"}</button>
          </div>
        </div>
        <div className="admin-access-card" aria-label="Trạng thái quyền">
          <span>ADMIN ACCESS</span>
          <strong>Đã xác minh</strong>
        </div>
      </section>

      <p className="admin-note">Phase này chỉ thiết lập ranh giới truy cập. Chưa có dữ liệu hoặc thao tác quản trị thật.</p>
    </section>
  </main>;
}
