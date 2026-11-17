import { aqiToLevel, AIR_QUALITY_LEVEL_LABEL } from "@/lib/air-quality";
import type { Numeric, Reading } from "./types";

export function numeric(value: Numeric | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}
export function numberText(value: Numeric | undefined, digits = 1) {
  const parsed = numeric(value);
  return parsed === null ? "—" : new Intl.NumberFormat("vi-VN", { maximumFractionDigits: digits }).format(parsed);
}
export function timeText(value: string | null | undefined) {
  if (!value || !Number.isFinite(Date.parse(value))) return "Chưa có thời điểm dữ liệu";
  return new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric", hour12: false }).format(new Date(value)) + " · UTC+7";
}
export function airPresentation(value: Numeric | undefined) {
  const aqi = numeric(value);
  if (aqi === null) return { level: "missing", label: "Chưa có dữ liệu", value: "—" };
  const level = aqiToLevel(aqi);
  return { level, label: AIR_QUALITY_LEVEL_LABEL[level], value: numberText(aqi, 0) };
}
export function isOld(value: string | null | undefined) {
  return !!value && Number.isFinite(Date.parse(value)) && Date.now() - Date.parse(value) > 3 * 60 * 60 * 1000;
}
export function chartPresentation(items: Reading[], period: "history" | "forecast") {
  const sorted = items.filter(item => Number.isFinite(Date.parse(item.valid_at))).toSorted((a, b) => Date.parse(a.valid_at) - Date.parse(b.valid_at));
  const values = sorted.map(item => numeric(item.us_aqi));
  const max = Math.max(50, Math.ceil(Math.max(...values.filter((v): v is number => v !== null), 0) / 50) * 50);
  const first = sorted[0] ? Date.parse(sorted[0].valid_at) : 0;
  const duration = sorted.length > 1 ? Date.parse(sorted.at(-1)!.valid_at) - first : 1;
  let continuing = false;
  const points: { x: number; y: number }[] = [];
  const path = sorted.map((item, index) => {
    const value = values[index];
    if (value === null) { continuing = false; return ""; }
    const x = 45 + (duration > 0 ? (Date.parse(item.valid_at) - first) / duration : 0) * 530;
    const y = 165 - (value / max) * 130;
    points.push({ x, y });
    const segment = `${continuing ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    continuing = true;
    return segment;
  }).join(" ");
  const labels = sorted.filter((_, index) => index % Math.max(1, Math.ceil(sorted.length / 6)) === 0).map(item => ({
    x: 45 + (duration > 0 ? (Date.parse(item.valid_at) - first) / duration : 0) * 530,
    text: new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(item.valid_at)),
  }));
  return { path, points, labels, max, middle: max / 2, count: points.length, dash: period === "forecast" ? "8 7" : "none", title: period === "forecast" ? "DỰ BÁO" : "LỊCH SỬ", description: `${period === "forecast" ? "Dự báo" : "Lịch sử"} US AQI, ${points.length} mốc có dữ liệu. Thời gian UTC+7.`, caption: sorted.length ? `Từ ${timeText(sorted[0].valid_at)} đến ${timeText(sorted.at(-1)!.valid_at)}. Dữ liệu mô hình, không phải số đo tại địa chỉ.` : "Chưa có dữ liệu." };
}
