import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

// ViewModel cho Auth (MVVM, xem AGENTS.md §3) — chưa có UI gọi vào, chờ wireframe
// trang signup/login được duyệt. init() nên gọi 1 lần ở component gốc (layout),
// trả về hàm unsubscribe để cleanup trong useEffect.
type AuthState = {
  user: User | null;
  loading: boolean;
  init: () => () => void;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  init: () => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => set({ user: data.user, loading: false }));

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, loading: false });
    });
    return () => data.subscription.unsubscribe();
  },
  signUp: async (email, password) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  },
  signInWithPassword: async (email, password) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  },
  signInWithGoogle: async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    return { error: error?.message ?? null };
  },
  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
