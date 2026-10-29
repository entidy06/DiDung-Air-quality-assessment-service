"use client";
import { useRef, useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useLocationStore } from "@/stores/location-store";
import { useApiResource } from "./use-api-resource";
import { apiRequest, errorMessage } from "@/lib/api/client";
import { numberText, timeText } from "@/lib/api/presentation";
import type { Metric, Notifications, Profile, Threshold } from "@/lib/api/types";

export function useAccountIdentity() {
  const { user, loading, generation, error } = useAuthStore();
  return { user, loading, error, scope: `${user?.id ?? "anonymous"}:${generation}` };
}
/** Scope-guard every mutation completion; old accounts cannot repopulate UI state. */
export function useAccountMutation(scope: string) {
  const [state, setState] = useState({ scope, pending: false, error: "", message: "", revision: 0 });
  const lock = useRef(false);
  const current = state.scope === scope ? state : { scope, pending: false, error: "", message: "", revision: 0 };
  const run = async (action: () => Promise<unknown>, success: string) => {
    if (lock.current) return false;
    lock.current = true;
    const auth = useAuthStore.getState();
    const captured = `${auth.user?.id ?? "anonymous"}:${auth.generation}`;
    if (captured !== scope || !auth.user) { lock.current = false; return false; }
    const stillCurrent = () => { const latest = useAuthStore.getState(); return `${latest.user?.id ?? "anonymous"}:${latest.generation}` === captured; };
    setState({ scope, pending: true, error: "", message: "", revision: current.revision });
    try {
      await action();
      if (!stillCurrent()) return false;
      setState({ scope, pending: false, error: "", message: success, revision: current.revision + 1 });
      return true;
    } catch (error) {
      if (stillCurrent()) setState({ scope, pending: false, error: errorMessage(error), message: "", revision: current.revision });
      return false;
    } finally { lock.current = false; }
  };
  return { ...current, run };
}

export function useThresholds(scope: string) {
  const user = useAuthStore(state => state.user);
  const locationId = useLocationStore(state => state.selectedId);
  const locations = useLocationStore(state => state.locations);
  const mutation = useAccountMutation(scope);
  const resource = useApiResource<Threshold[]>(user ? "/api/me/thresholds" : null, scope, mutation.revision);
  const [metric, setMetric] = useState<Metric>("aqi");
  const [value, setValue] = useState("100");
  const [editing, setEditing] = useState<Threshold | null>(null);
  const [validation, setValidation] = useState("");
  const cancel = () => { setEditing(null); setValue("100"); setMetric("aqi"); setValidation(""); };
  const edit = (row: Threshold) => { setEditing(row); setMetric(row.metric); setValue(String(row.threshold_value ?? "")); setValidation(""); };
  const save = async () => {
    const parsed = Number(value);
    if (!value.trim() || !Number.isFinite(parsed) || parsed <= 0 || (metric === "aqi" && !Number.isInteger(parsed)) || (metric === "pm25" && Math.abs(parsed * 10 - Math.round(parsed * 10)) > 1e-7)) { setValidation("Nhập số dương hợp lệ: AQI là số nguyên, PM2.5 theo bước 0,1."); return; }
    if (!editing && !locationId) { setValidation("Chọn khu vực trước khi lưu."); return; }
    setValidation("");
    const saved = await mutation.run(() => apiRequest(editing ? `/api/me/thresholds/${encodeURIComponent(editing.id)}` : "/api/me/thresholds", { method: editing ? "PATCH" : "POST", body: JSON.stringify(editing ? { threshold_value: parsed } : { location_id: locationId, metric, threshold_value: parsed }) }), "Đã lưu ngưỡng.");
    if (saved) cancel();
  };
  const toggle = (row: Threshold) => mutation.run(() => apiRequest(`/api/me/thresholds/${encodeURIComponent(row.id)}`, { method: "PATCH", body: JSON.stringify({ is_active: !row.is_active }) }), "Đã cập nhật trạng thái ngưỡng.");
  const remove = (row: Threshold) => mutation.run(() => apiRequest(`/api/me/thresholds/${encodeURIComponent(row.id)}`, { method: "DELETE" }), "Đã xóa ngưỡng.");
  const items = (resource.data ?? []).map(row => ({ ...row, locationName: locations.find(location => location.id === row.location_id)?.name ?? "Khu vực", metricLabel: row.metric === "aqi" ? "US AQI" : "PM2.5 (µg/m³)", value: numberText(row.threshold_value) }));
  return { resource, mutation, items, metric, setMetric, value, setValue, editing, validation, edit, cancel, save, toggle, remove, canSave: !!locationId || !!editing };
}
export function useNotifications(scope: string) {
  const user = useAuthStore(state => state.user);
  const mutation = useAccountMutation(scope);
  const resource = useApiResource<Notifications>(user ? "/api/me/notifications" : null, scope, mutation.revision);
  const items = (resource.data?.items ?? []).map(row => ({ ...row, time: timeText(row.created_at) }));
  const markRead = (id: string) => mutation.run(() => apiRequest(`/api/me/notifications/${encodeURIComponent(id)}/read`, { method: "PATCH" }), "Đã đánh dấu đã đọc.");
  return { resource, mutation, items, unread: resource.data?.unread_count ?? 0, markRead };
}
export function useProfile(scope: string) {
  const user = useAuthStore(state => state.user);
  const mutation = useAccountMutation(scope);
  const resource = useApiResource<Profile>(user ? "/api/me" : null, scope, mutation.revision);
  const [draft, setDraft] = useState<string | null>(null);
  const [signOutError, setSignOutError] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const save = () => mutation.run(() => apiRequest("/api/me", { method: "PATCH", body: JSON.stringify({ display_name: (draft ?? resource.data?.display_name ?? "").trim() }) }), "Đã lưu tên hiển thị.");
  const signOut = async () => { setSigningOut(true); setSignOutError(""); const result = await useAuthStore.getState().signOut(); if (result.error) { setSignOutError(result.error); setSigningOut(false); } };
  return { resource, mutation, displayName: draft ?? resource.data?.display_name ?? "", setDraft, save, signOut, signOutError, signingOut, email: user?.email ?? "" };
}
