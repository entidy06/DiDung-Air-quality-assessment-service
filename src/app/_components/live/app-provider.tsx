"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useLocationStore } from "@/stores/location-store";
import { useLandingFragment } from "@/hooks/use-landing-navigation";
import { useAuthReturn } from "@/hooks/use-auth-return";
export function AppProvider({ children }: { children: React.ReactNode }) {
  const init = useAuthStore(state => state.init);
  const user = useAuthStore(state => state.user);
  const load = useLocationStore(state => state.load);
  useLandingFragment();
  useAuthReturn();
  useEffect(() => init(), [init]);
  useEffect(() => { if (user) void load(); }, [load, user]);
  return children;
}
