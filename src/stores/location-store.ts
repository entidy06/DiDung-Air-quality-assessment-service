"use client";
import { create } from "zustand";
import { apiRequest, errorMessage } from "@/lib/api/client";
import type { Location } from "@/lib/api/types";

type LocationState = {
  locations: Location[]; selectedId: string; status: "idle" | "loading" | "ready" | "error"; error: string | null;
  load: () => Promise<void>; select: (id: string) => void;
};
export const useLocationStore = create<LocationState>((set, get) => ({
  locations: [], selectedId: "", status: "idle", error: null,
  load: async () => {
    if (get().status === "loading") return;
    set({ status: "loading", error: null });
    try {
      const { locations } = await apiRequest<{ locations: Location[] }>("/api/locations");
      let saved = "";
      try { saved = localStorage.getItem("didung-location") ?? ""; } catch { /* Storage may be disabled. */ }
      const preferred = get().selectedId || saved;
      const selected = locations.find(item => item.id === preferred) ?? locations.find(item => item.slug === "sai-gon") ?? locations[0];
      set({ locations, selectedId: selected?.id ?? "", status: "ready" });
    } catch (error) { set({ status: "error", error: errorMessage(error) }); }
  },
  select: (id) => {
    if (!get().locations.some(item => item.id === id)) return;
    set({ selectedId: id });
    try { localStorage.setItem("didung-location", id); } catch { /* Selection still works in memory. */ }
  },
}));
