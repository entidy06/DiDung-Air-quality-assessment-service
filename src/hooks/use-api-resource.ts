"use client";
import { useCallback, useEffect, useState } from "react";
import { apiRequest, ApiError, errorMessage } from "@/lib/api/client";

type ResourceState<T> = { identity: string; data: T | null; status: "ready" | "empty" | "error" | "unauthorized"; error: string | null };
export function useApiResource<T>(url: string | null, scope = "public", revision = 0) {
  const [retry, setRetry] = useState(0);
  const [state, setState] = useState<ResourceState<T> | null>(null);
  const identity = `${scope}:${url}:${revision}:${retry}`;
  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    apiRequest<T>(url, { signal: controller.signal }).then(data => {
      if (!controller.signal.aborted) setState({ identity, data, status: "ready", error: null });
    }).catch((error: unknown) => {
      if (controller.signal.aborted) return;
      setState({ identity, data: null, status: error instanceof ApiError && error.status === 404 ? "empty" : error instanceof ApiError && error.status === 401 ? "unauthorized" : "error", error: errorMessage(error) });
    });
    return () => controller.abort();
  }, [url, identity]);
  const current = state?.identity === identity ? state : null;
  const reload = useCallback(() => setRetry(value => value + 1), []);
  return { data: url ? current?.data ?? null : null, status: !url ? "idle" as const : current?.status ?? "loading" as const, error: current?.error ?? null, reload };
}
