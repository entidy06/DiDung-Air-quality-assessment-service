"use client";
import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type AuthResult = { error: string | null };
type AuthState = {
  user: User | null; loading: boolean; error: string | null; generation: number;
  init: () => () => void;
  signUp: (email: string, password: string) => Promise<AuthResult & { signedIn: boolean }>;
  signInWithPassword: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
};
export const useAuthStore = create<AuthState>((set, get) => {
  const acceptUser = (user: User | null) => set(state => ({ user, loading: false, error: null, generation: state.generation + (state.user?.id !== user?.id ? 1 : 0) }));
  return {
    user: null, loading: true, error: null, generation: 0,
    init: () => {
      let alive = true;
      let events = 0;
      try {
        const supabase = createClient();
        const { data } = supabase.auth.onAuthStateChange((_event, session) => { events++; if (alive) acceptUser(session?.user ?? null); });
        const initialEvents = events;
        supabase.auth.getUser().then(({ data, error }) => {
          if (!alive || events !== initialEvents) return;
          acceptUser(data.user);
          if (error && error.name !== "AuthSessionMissingError") set({ error: "Không kiểm tra được phiên đăng nhập. Hãy tải lại trang." });
        }).catch(() => { if (alive && events === initialEvents) set({ loading: false, error: "Không kết nối được dịch vụ đăng nhập." }); });
        return () => { alive = false; data.subscription.unsubscribe(); };
      } catch { set({ loading: false, error: "Chưa cấu hình được dịch vụ đăng nhập." }); return () => { alive = false; }; }
    },
    signUp: async (email, password) => {
      try {
        const { data, error } = await createClient().auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
        if (data.session) acceptUser(data.user);
        return { error: error?.message ?? null, signedIn: !!data.session };
      } catch { return { error: "Không kết nối được dịch vụ đăng ký.", signedIn: false }; }
    },
    signInWithPassword: async (email, password) => {
      try {
        const { data, error } = await createClient().auth.signInWithPassword({ email, password });
        if (!error) acceptUser(data.user);
        return { error: error?.message ?? null };
      } catch { return { error: "Không kết nối được dịch vụ đăng nhập." }; }
    },
    signInWithGoogle: async () => {
      try {
        const { error } = await createClient().auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
        return { error: error?.message ?? null };
      } catch { return { error: "Không khởi động được đăng nhập Google." }; }
    },
    signOut: async () => {
      const previous = get().generation;
      try {
        const { error } = await createClient().auth.signOut();
        if (error) return { error: error.message };
        if (get().generation === previous) acceptUser(null);
        return { error: null };
      } catch { return { error: "Chưa đăng xuất được. Hãy thử lại." }; }
    },
  };
});
