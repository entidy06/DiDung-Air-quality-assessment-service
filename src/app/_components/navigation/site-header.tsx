"use client";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { LandingLink } from "./landing-link";
import { useStickyHeader } from "@/hooks/use-sticky-header";
export function SiteHeader() {
  const user = useAuthStore(state => state.user);
  const headerRef = useStickyHeader();
  return <header ref={headerRef} className="header wrap">
    <LandingLink section="home" className="brand" aria-label="DiDung, về đầu trang">
      <span className="brand-sprout" aria-hidden="true">✳</span>DiDung<span className="brand-dot">.</span>
    </LandingLink>
    <nav aria-label="Điều hướng chính">
      <LandingLink section="chapter-air">Câu chuyện</LandingLink>
      <LandingLink section="features">DiDung có gì?</LandingLink>
      <LandingLink section="sources">Nguồn dữ liệu</LandingLink>
    </nav>
    <div className="header-actions">
      <LandingLink className="button small" section="chapter-alert">Ngưỡng & thông báo</LandingLink>
      {user ? <LandingLink className="button small primary" section="account">Tài khoản <span aria-hidden="true">↓</span></LandingLink> : <Link className="button small primary" href="/auth">Đăng nhập <span aria-hidden="true">↗</span></Link>}
    </div>
  </header>;
}
