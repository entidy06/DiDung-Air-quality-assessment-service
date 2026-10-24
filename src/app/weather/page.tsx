import type { Metadata } from "next";
import { WeatherChapter } from "../_components/story/weather-chapter";
export const metadata: Metadata = { title: "Thời tiết & lời khuyên" };
export default function Page() {
  return <main id="main-content">
    <h1 className="sr-only">Thời tiết & lời khuyên</h1>
    <div className="wrap route-content">
      <WeatherChapter />
    </div>
  </main>;
}
