"use client";

import { useIllustrativeMetrics } from "@/hooks/use-landing-demo";

export function WeatherDemoPanel() {
  const values = useIllustrativeMetrics();
  const tiles = [
    { label: "Khả năng mưa", icon: "☂", value: `${values.rain}%` },
    { label: "Chỉ số UV", icon: "☼", value: String(values.uv) },
    { label: "Gió", icon: "≋", value: `${values.wind} km/h` },
    { label: "Độ ẩm", icon: "♧", value: `${values.humidity}%` },
  ];
  return <div className="soft-panel">
    <div className="panel-top"><h3>Thời tiết trước khi đi</h3><span className="pill">MINH HỌA</span></div>
    <div className="weather-grid">{tiles.map(tile => <div className="weather-tile" key={tile.label}><span className="weather-icon" aria-hidden="true">{tile.icon}</span><span>{tile.label}</span><strong>{tile.value}</strong></div>)}</div>
    <p className="data-note">Minh họa · các số thay đổi ngẫu nhiên, không phải thời tiết hiện tại.</p>
  </div>;
}
