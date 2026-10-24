"use client";
import { useMemo, useState } from "react";
import { useLocationStore } from "@/stores/location-store";
import { useApiResource } from "./use-api-resource";
import { airPresentation, chartPresentation, isOld, numberText, timeText } from "@/lib/api/presentation";
import type { AirReading, WeatherReading, Advisory, Series, Snapshot } from "@/lib/api/types";

export function useSelectedLocation() {
  const id = useLocationStore(state => state.selectedId);
  const locations = useLocationStore(state => state.locations);
  return { id, location: locations.find(item => item.id === id) };
}
export function useAirQuality() {
  const { id, location } = useSelectedLocation();
  const resource = useApiResource<AirReading>(id ? `/api/air-quality/current?locationId=${encodeURIComponent(id)}` : null);
  return { ...resource, locationName: location?.name ?? "Chưa chọn khu vực", air: airPresentation(resource.data?.us_aqi), pm: numberText(resource.data?.pm2_5), time: timeText(resource.data?.valid_at), stale: isOld(resource.data?.valid_at), source: resource.data?.source ?? "Open-Meteo / CAMS" };
}
export function useWeather() {
  const { id } = useSelectedLocation();
  const weather = useApiResource<WeatherReading>(id ? `/api/weather/current?locationId=${encodeURIComponent(id)}` : null);
  const advice = useApiResource<Advisory>(id ? `/api/advisories/current?locationId=${encodeURIComponent(id)}` : null);
  const tiles = [
    { label: "Khả năng mưa", icon: "☂", value: numberText(weather.data?.precipitation_probability), unit: "%" },
    { label: "Chỉ số UV", icon: "☼", value: numberText(weather.data?.uv_index), unit: "" },
    { label: "Gió", icon: "≋", value: numberText(weather.data?.wind_speed), unit: " km/h" },
    { label: "Độ ẩm", icon: "♧", value: numberText(weather.data?.relative_humidity), unit: "%" },
  ];
  return { weather, advice, tiles, time: timeText(weather.data?.valid_at), stale: isOld(weather.data?.valid_at), adviceTime: timeText(advice.data?.valid_at) };
}
export function useAirTrend() {
  const { id } = useSelectedLocation();
  const [period, setPeriod] = useState<"history" | "forecast">("forecast");
  const resource = useApiResource<Series>(id ? `/api/air-quality/${period}?locationId=${encodeURIComponent(id)}` : null);
  return { ...resource, period, setPeriod, chart: chartPresentation(resource.data?.items ?? [], period) };
}
export function useMapSnapshot() {
  const resource = useApiResource<Snapshot>("/api/map/snapshot");
  const selectedId = useLocationStore(state => state.selectedId);
  const select = useLocationStore(state => state.select);
  const items = useMemo(() => (resource.data?.items ?? []).map(item => ({ ...item, air: airPresentation(item.us_aqi), pm: numberText(item.pm2_5), time: timeText(item.valid_at), stale: isOld(item.valid_at) })), [resource.data]);
  return { ...resource, items, selectedId, select };
}
