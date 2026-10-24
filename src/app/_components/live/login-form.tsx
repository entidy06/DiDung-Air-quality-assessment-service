"use client";
import { useAuthForm } from "@/hooks/use-auth-form";
export function LoginForm({ callbackError = "" }: { callbackError?: string }) {
  const vm = useAuthForm();
  return <section className="login-preview login-page" aria-labelledby="login-title">
    <span className="eyebrow">MỘT NGƯỜI BẠN NHỎ TRƯỚC MỖI CHUYẾN ĐI</span>
    <h2 id="login-title">{vm.mode === "login" ? "Đăng nhập cùng DiDung" : "Tạo tài khoản DiDung"}</h2>
    <div className="segmented" role="group" aria-label="Tài khoản">
      <button type="button" aria-pressed={vm.mode === "login"} disabled={vm.pending} onClick={() => vm.changeMode("login")}>Đăng nhập</button>
      <button type="button" aria-pressed={vm.mode === "signup"} disabled={vm.pending} onClick={() => vm.changeMode("signup")}>Đăng ký</button>
    </div>
    <form className="live-form" onSubmit={event => { event.preventDefault(); void vm.submit(); }}>
      <label className="live-field" htmlFor="auth-email">Email<input id="auth-email" type="email" value={vm.email} onChange={event => vm.setEmail(event.target.value)} required autoComplete="email" disabled={vm.pending} />
      </label>
      <label className="live-field" htmlFor="auth-password">Mật khẩu<input id="auth-password" type="password" value={vm.password} onChange={event => vm.setPassword(event.target.value)} minLength={vm.mode === "signup" ? 6 : undefined} required autoComplete={vm.mode === "signup" ? "new-password" : "current-password"} disabled={vm.pending} />
      </label>
      <button className="button primary" type="submit" disabled={vm.pending || vm.loading}>{vm.pending ? "Đang xử lý…" : vm.mode === "login" ? "Đăng nhập ↗" : "Tạo tài khoản ↗"}</button>
      <button className="button" type="button" onClick={() => void vm.google()} disabled={vm.pending || vm.loading}>Tiếp tục với Google</button>
  </form>{(vm.error || callbackError) && <p className="live-status error" role="alert">{vm.error || callbackError}</p>}{vm.message && <p className="live-status" role="status">{vm.message}</p>}</section>;
}
