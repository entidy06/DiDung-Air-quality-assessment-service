export const AUTH_LANDING = "/app";

export function authFailurePath(code?: string | null) {
  const params = new URLSearchParams({ auth_error: "1" });
  if (code && /^[a-z0-9_]{1,80}$/.test(code)) params.set("auth_error_code", code);
  return `/auth?${params}`;
}

export function authFailureMessage(code?: string | null) {
  if (code === "flow_state_already_used") return "Liên kết đăng nhập này đã được sử dụng. Hãy bắt đầu một lượt đăng nhập mới.";
  if (["flow_state_expired", "flow_state_not_found", "otp_expired", "bad_code_verifier", "code_verifier_not_found"].includes(code ?? "")) return "Phiên đăng nhập đã hết hạn hoặc không thuộc trình duyệt này. Hãy đăng nhập lại trong cùng trình duyệt.";
  if (code === "access_denied") return "Bạn chưa cấp quyền đăng nhập. Có thể thử lại khi sẵn sàng.";
  return "Không hoàn tất được xác thực. Hãy bắt đầu đăng nhập lại.";
}

export function safeAuthDestination(raw: string | null, origin: string) {
  if (!raw?.startsWith("/") || raw.startsWith("//") || /[\\\u0000-\u0020]/.test(raw)) return `${origin}${AUTH_LANDING}`;
  try {
    const target = new URL(raw, origin);
    if (target.origin !== origin || target.pathname.startsWith("/auth/")) return `${origin}${AUTH_LANDING}`;
    return target.href;
  } catch { return `${origin}${AUTH_LANDING}`; }
}

/** Handle providers falling back to Site URL before any browser Auth client mounts. */
export function landingAuthRedirect(query: Record<string, string | string[] | undefined>) {
  const value = (key: string) => typeof query[key] === "string" ? query[key] as string : null;
  if (value("error") || value("error_code")) return authFailurePath(value("error_code") ?? value("error"));
  const code = value("code");
  if (code) return `/auth/callback?${new URLSearchParams({ code })}`;
  return null;
}
