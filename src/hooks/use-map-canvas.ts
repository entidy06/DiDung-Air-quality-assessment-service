"use client";
import { useEffect, useRef, useState } from "react";
import type { Map as MapboxMap, Marker } from "mapbox-gl";
import type { useMapSnapshot } from "./use-environment";
type Items = ReturnType<typeof useMapSnapshot>["items"];
export function useMapCanvas(items: Items, selectedId: string, select: (id: string) => void) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MapboxMap | null>(null);
  const markers = useRef<Marker[]>([]);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  useEffect(() => {
    if (!token || !container.current) return;
    let cancelled = false;
    import("mapbox-gl").then(({ default: mapbox }) => {
      if (cancelled || !container.current) return;
      const instance = new mapbox.Map({ container: container.current, accessToken: token, style: "mapbox://styles/mapbox/light-v11", center: [106.7, 10.78], zoom: 9 });
      map.current = instance;
      instance.addControl(new mapbox.NavigationControl());
      instance.on("load", () => { if (!cancelled) setReady(true); });
      instance.on("error", () => { if (!cancelled) setError("Không tải được bản đồ. Bạn vẫn có thể dùng danh sách khu vực bên dưới."); });
    }).catch(() => { if (!cancelled) setError("Trình duyệt không khởi tạo được bản đồ. Hãy dùng danh sách khu vực."); });
    return () => { cancelled = true; map.current?.remove(); map.current = null; };
  }, [token]);
  useEffect(() => {
    if (!ready || !map.current) return;
    let cancelled = false;
    import("mapbox-gl").then(({ default: mapbox }) => {
      if (cancelled || !map.current) return;
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      const palette = getComputedStyle(document.documentElement);
      for (const item of items) {
        const longitude = Number(item.longitude), latitude = Number(item.latitude);
        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) continue;
        const content = document.createElement("div");
        const heading = document.createElement("strong"); heading.textContent = item.name;
        const text = document.createElement("p"); text.textContent = `US AQI ${item.air.value} · ${item.air.label}. PM2.5 ${item.pm} µg/m³. ${item.time}${item.stale ? " · Dữ liệu cũ" : ""}`;
        const button = document.createElement("button"); button.type = "button"; button.className = "button small"; button.textContent = "Chọn khu vực"; button.addEventListener("click", () => select(item.location_id));
        content.append(heading, text, button);
        const colorToken = item.air.level === "unhealthy" ? "--crimson" : item.air.level === "sensitive" ? "--orange" : item.air.level === "moderate" ? "--butter" : item.air.level === "missing" ? "--brown" : "--olive";
        const marker = new mapbox.Marker({ color: palette.getPropertyValue(colorToken).trim() }).setLngLat([longitude, latitude]).setPopup(new mapbox.Popup().setDOMContent(content)).addTo(map.current);
        if (item.location_id === selectedId) marker.togglePopup();
        markers.current.push(marker);
      }
    });
    return () => { cancelled = true; markers.current.forEach(marker => marker.remove()); markers.current = []; };
  }, [items, ready, selectedId, select]);
  return { container, error, configured: !!token };
}
