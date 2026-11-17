import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next.js 16 đổi tên middleware.ts -> proxy.ts (export "proxy" thay vì "middleware"),
// xem https://nextjs.org/docs/app/api-reference/file-conventions/proxy.
export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
