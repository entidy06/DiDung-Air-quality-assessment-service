// Phân loại mức AQI theo breakpoint US EPA chuẩn (0-50/51-100/101-150/151+),
// khớp 4 mức màu đã định nghĩa trong design.md (tốt/trung bình/nhạy cảm/xấu).
export type AirQualityLevel = "good" | "moderate" | "sensitive" | "unhealthy";

export const AIR_QUALITY_LEVEL_LABEL: Record<AirQualityLevel, string> = {
  good: "tốt",
  moderate: "trung bình",
  sensitive: "nhạy cảm (ảnh hưởng người nhạy cảm)",
  unhealthy: "xấu",
};

export function aqiToLevel(usAqi: number | null): AirQualityLevel {
  if (usAqi === null) return "moderate";
  if (usAqi <= 50) return "good";
  if (usAqi <= 100) return "moderate";
  if (usAqi <= 150) return "sensitive";
  return "unhealthy";
}
