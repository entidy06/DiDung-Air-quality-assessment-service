import type { Metadata } from "next";
import { TrendChapter } from "../_components/story/trend-chapter";
export const metadata: Metadata = { title: "Lịch sử & dự báo" };
export default function Page() {
  return <main id="main-content">
    <h1 className="sr-only">Lịch sử & dự báo</h1>
    <div className="wrap route-content">
      <TrendChapter />
    </div>
  </main>;
}
