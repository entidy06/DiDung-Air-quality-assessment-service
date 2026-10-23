// Client cho Open-Meteo — nguồn PM2.5/AQI + thời tiết duy nhất của MVP (xem docs/specs/2026-10-22-backend-schema.md).
// Free tier, không cần API key. Hỗ trợ nhiều tọa độ/lần gọi (comma-separated) — dùng để giảm số request
// khi đồng bộ hàng loạt location, thay vì gọi riêng từng location.

export type LocationCoord = {
  id: string;
  latitude: number;
  longitude: number;
};

type WeatherHourly = {
  time: string[];
  precipitation: (number | null)[];
  precipitation_probability: (number | null)[];
  relative_humidity_2m: (number | null)[];
  wind_speed_10m: (number | null)[];
  wind_direction_10m: (number | null)[];
  uv_index: (number | null)[];
  sunshine_duration: (number | null)[];
};

type AirQualityHourly = {
  time: string[];
  pm2_5: (number | null)[];
  european_aqi: (number | null)[];
  us_aqi: (number | null)[];
};

export type WeatherResult = { locationId: string; hourly: WeatherHourly };
export type AirQualityResult = { locationId: string; hourly: AirQualityHourly };

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

// An toàn cho độ dài URL khi gọi nhiều tọa độ cùng lúc (đã verify: response trả về
// dạng object khi 1 tọa độ, dạng array khi >=2 tọa độ — xử lý cả 2 trường hợp dưới đây).
const BATCH_SIZE = 50;

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

async function fetchBatched<T extends { time: string[] }>(
  baseUrl: string,
  hourlyParams: string,
  locations: LocationCoord[],
  forecastDays: number,
): Promise<{ locationId: string; hourly: T }[]> {
  const out: { locationId: string; hourly: T }[] = [];

  for (const batch of chunk(locations, BATCH_SIZE)) {
    const lat = batch.map((l) => l.latitude).join(",");
    const lon = batch.map((l) => l.longitude).join(",");
    const url = `${baseUrl}?latitude=${lat}&longitude=${lon}&hourly=${hourlyParams}&forecast_days=${forecastDays}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Open-Meteo lỗi ${res.status}: ${await res.text()}`);
    }
    const data = (await res.json()) as Record<string, unknown> | Record<string, unknown>[];
    const items = Array.isArray(data) ? data : [data];

    items.forEach((item, idx) => {
      out.push({
        locationId: batch[idx].id,
        hourly: (item as { hourly: T }).hourly,
      });
    });
  }

  return out;
}

export function fetchWeatherForLocations(
  locations: LocationCoord[],
  forecastDays = 2,
): Promise<WeatherResult[]> {
  return fetchBatched<WeatherHourly>(
    WEATHER_URL,
    "precipitation,precipitation_probability,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,sunshine_duration",
    locations,
    forecastDays,
  );
}

export function fetchAirQualityForLocations(
  locations: LocationCoord[],
  forecastDays = 2,
): Promise<AirQualityResult[]> {
  return fetchBatched<AirQualityHourly>(
    AIR_QUALITY_URL,
    "pm2_5,european_aqi,us_aqi",
    locations,
    forecastDays,
  );
}

// Open-Meteo trả "time" dạng "2026-10-22T00:00" không có timezone khi không truyền
// tham số `timezone` — mặc định là GMT (đã verify thực nghiệm), tương đương UTC.
export function toUtcIso(openMeteoTime: string): string {
  return `${openMeteoTime}:00Z`;
}
