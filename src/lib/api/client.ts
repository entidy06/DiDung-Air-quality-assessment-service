export class ApiError extends Error {
  constructor(public readonly status: number, message: string) { super(message); }
}

/** Model HTTP boundary. Relative URLs keep session cookies on the same origin. */
export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...options,
    credentials: "same-origin",
    cache: "no-store",
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers },
  });
  if (response.status === 204) return undefined as T;
  let data: unknown;
  try { data = await response.json(); } catch {
    throw new ApiError(response.status, "Máy chủ trả phản hồi không hợp lệ. Hãy thử lại.");
  }
  if (!response.ok) {
    const message = response.status === 401 ? "Đăng nhập để sử dụng tính năng này."
      : response.status === 404 ? "Chưa có dữ liệu."
      : response.status === 400 && data && typeof data === "object" && "error" in data && typeof data.error === "string"
        ? data.error : "Không xử lý được yêu cầu. Hãy thử lại.";
    throw new ApiError(response.status, message);
  }
  return data as T;
}

export function errorMessage(error: unknown) {
  return error instanceof ApiError ? error.message : "Không kết nối được máy chủ. Hãy thử lại.";
}
