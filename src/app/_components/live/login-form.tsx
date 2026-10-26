"use client";
import { useAuthForm } from "@/hooks/use-auth-form";
export function LoginForm({ callbackError = "" }: { callbackError?: string }) {
  const vm = useAuthForm();
  return <section className="exp-auth-card exp-raised" aria-labelledby="login-title">
    <h2 id="login-title">{vm.mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}</h2>
    <p>{vm.mode === "login" ? "Chào mừng bạn quay lại DiDung." : "Tạo tài khoản để lưu khu vực và ngưỡng riêng."}</p>
    <button className="exp-button exp-google" type="button" onClick={() => void vm.google()} disabled={vm.pending || vm.loading}>Tiếp tục với Google</button>
    <div className="exp-divider">hoặc dùng email</div>
    <form onSubmit={event => { event.preventDefault(); void vm.submit(); }}>
      <label className="exp-field" htmlFor="auth-email">Email<input id="auth-email" type="email" value={vm.email} onChange={event => vm.setEmail(event.target.value)} required autoComplete="email" disabled={vm.pending} placeholder="ban@example.com" /></label>
      <label className="exp-field" htmlFor="auth-password">Mật khẩu<input id="auth-password" type="password" value={vm.password} onChange={event => vm.setPassword(event.target.value)} minLength={vm.mode === "signup" ? 6 : undefined} required autoComplete={vm.mode === "signup" ? "new-password" : "current-password"} disabled={vm.pending} placeholder="Nhập mật khẩu" /></label>
      <button className="exp-button exp-primary exp-auth-submit" type="submit" disabled={vm.pending || vm.loading}>{vm.pending ? "Đang xử lý…" : vm.mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}</button>
    </form>
    <p className="exp-auth-switch">{vm.mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"} <button type="button" onClick={() => vm.changeMode(vm.mode === "login" ? "signup" : "login")} disabled={vm.pending}>{vm.mode === "login" ? "Tạo tài khoản" : "Đăng nhập"}</button></p>
    {(vm.error || callbackError) && <p className="exp-feedback exp-error" role="alert">{vm.error || callbackError}</p>}{vm.message && <p className="exp-feedback" role="status">{vm.message}</p>}
  </section>;
}
