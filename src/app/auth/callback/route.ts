import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { authFailurePath, safeAuthDestination } from "@/lib/auth-navigation";

function authRedirect(url: string) {
  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

/** This route is the sole owner of PKCE code exchange; browser auto-exchange is disabled. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const destination = safeAuthDestination(searchParams.get("next"), origin);
  const failure = (code?: string | null) => authRedirect(new URL(authFailurePath(code), origin).href);
  if (searchParams.has("error") || searchParams.has("error_code")) return failure(searchParams.get("error_code") ?? searchParams.get("error"));
  const code = searchParams.get("code");
  if (!code) return failure();

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return authRedirect(destination);
    // A re-opened callback must not discard a session established by the first visit.
    const { data } = await supabase.auth.getUser();
    if (data.user) return authRedirect(destination);
    return failure(error.code);
  } catch { return failure(); }
}
