"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authFailurePath } from "@/lib/auth-navigation";

/** Some providers return errors in fragments, which the server cannot read. */
export function useAuthReturn() {
  const router = useRouter();
  useEffect(() => {
    const check = () => {
      const params = new URLSearchParams(window.location.hash.slice(1));
      if (params.has("error") || params.has("error_code")) router.replace(authFailurePath(params.get("error_code") ?? params.get("error")));
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [router]);
}
