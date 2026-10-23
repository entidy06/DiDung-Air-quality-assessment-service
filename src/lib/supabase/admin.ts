import { createClient } from "@supabase/supabase-js";

// CHỈ dùng trong API route/cron job phía server — bypass RLS bằng service role key.
// Không bao giờ import file này từ Client Component hoặc code chạy ở browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
}
