import type { Metadata } from "next";
import { AirPanel } from "../_components/demo/air-panel";
import { TrendPanel } from "../_components/demo/trend-panel";
import { AlertPanel } from "../_components/demo/alert-panel";
export const metadata: Metadata = { title: "Bản minh họa" };
export default function DemoPage() {
  return <main id="main-content" className="wrap route-content">
    <h1>Bản minh họa DiDung</h1>
    <p>Các số dưới đây là ví dụ để khám phá giao diện. Xem dữ liệu thật tại trang chất lượng không khí.</p>
    <AirPanel />
    <TrendPanel />
    <AlertPanel />
  </main>;
}
