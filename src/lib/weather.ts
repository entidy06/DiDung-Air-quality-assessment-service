// Bucket hóa tín hiệu thời tiết để GOM NHÓM trước khi gọi LLM (giống cách làm với
// air_quality_level) — thời tiết biến đổi mịn hơn AQI (~10km vs ~45km), nên không thể
// chỉ lấy 1 location đại diện cho cả nhóm AQI như trước; phải gom nhóm theo cả
// air_quality_level + rain_bucket + uv_bucket để mỗi nhóm thực sự đồng nhất.

export type RainProbabilityBucket = "low" | "medium" | "high";
export type UvIndexBucket = "low" | "moderate" | "high" | "very_high";

export const RAIN_BUCKET_LABEL: Record<RainProbabilityBucket, string> = {
  low: "khó có mưa",
  medium: "có thể mưa",
  high: "khả năng mưa cao",
};

// Ngưỡng % — lựa chọn UX, không phải chuẩn khí tượng học bắt buộc.
export function rainProbabilityBucket(probability: number | null): RainProbabilityBucket {
  if (probability === null) return "low";
  if (probability < 30) return "low";
  if (probability <= 60) return "medium";
  return "high";
}

export const UV_BUCKET_LABEL: Record<UvIndexBucket, string> = {
  low: "thấp",
  moderate: "trung bình",
  high: "cao",
  very_high: "rất cao",
};

// Ngưỡng theo thang UV Index chuẩn WHO/EPA (0-2 Low, 3-5 Moderate, 6-7 High, 8+ Very High/Extreme).
export function uvIndexBucket(uvIndex: number | null): UvIndexBucket {
  if (uvIndex === null) return "low";
  if (uvIndex <= 2) return "low";
  if (uvIndex <= 5) return "moderate";
  if (uvIndex <= 7) return "high";
  return "very_high";
}
