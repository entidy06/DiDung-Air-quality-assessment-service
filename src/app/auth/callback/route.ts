import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Supabase OAuth (Google, ...) redirect về đây sau khi người dùng đồng ý —
// đổi "code" lấy session rồi set cookie, không cần tạo profile thủ công
// (trigger handle_new_user đã tự tạo dòng public.profiles khi auth.users có user mới).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Chưa có trang /auth/error riêng (UI đang chờ wireframe theo AGENTS.md §5) —
  // tạm redirect về "/" kèm query để frontend tự quyết định hiển thị lỗi thế nào.
  return NextResponse.redirect(`${origin}/?auth_error=1`);
}
