import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { authFailurePath, safeAuthDestination } from "@/lib/auth-navigation";
import { getViewer } from "@/lib/auth/authorization";

function authRedirect(url: string) {
  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

/** This route is the sole owner of PKCE code exchange; browser auto-exchange is disabled. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const failure = (code?: string | null) => authRedirect(new URL(authFailurePath(code), origin).href);
  const success = async () => {
    const viewer = await getViewer();
    if (!viewer.role) return failure();
    return authRedirect(safeAuthDestination(searchParams.get("next"), origin, viewer.role));
  };
  if (searchParams.has("error") || searchParams.has("error_code")) return failure(searchParams.get("error_code") ?? searchParams.get("error"));
  const code = searchParams.get("code");
  if (!code) return failure();

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return success();
    // A re-opened callback must not discard a session established by the first visit.
    const { data } = await supabase.auth.getUser();
    if (data.user) return success();
    return failure(error.code);
  } catch { return failure(); }
}
