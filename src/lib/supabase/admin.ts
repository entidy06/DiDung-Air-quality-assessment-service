import { createClient } from "@supabase/supabase-js";

// CHỈ dùng trong API route/cron job phía server — bypass RLS bằng secret key
// (Supabase đã đổi tên "service_role key" (JWT) -> "Secret key" (sb_secret_...)).
// Không bao giờ import file này từ Client Component hoặc code chạy ở browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
}
