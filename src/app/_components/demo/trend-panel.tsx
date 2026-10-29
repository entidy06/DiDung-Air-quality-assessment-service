"use client";
import { useTrendDemo } from "@/hooks/use-landing-demo";
export function TrendPanel() {
  const { period, chart, setPeriod } = useTrendDemo();
  return (<div className="soft-panel trend-panel">
    <div className="panel-top">
      <h3>Một ngày, nhiều nhịp thở.</h3>
      <span className="pill">MINH HỌA</span>
    </div>
    <div className="segmented" role="group" aria-label="Khoảng thời gian biểu đồ minh họa">
      <button type="button" data-period="history" aria-pressed={period === "history"} onClick={() => setPeriod("history")}>24 giờ qua</button>
      <button type="button" data-period="forecast" aria-pressed={period === "forecast"} onClick={() => setPeriod("forecast")}>24 giờ tới</button>
    </div>
    <div className="chart-head">
      <span>US AQI · Dữ liệu mô hình</span>
      <span id="chart-type">{chart.title}</span>
    </div>
    <svg className="chart" viewBox="0 0 600 230" role="img" aria-labelledby="chart-title chart-description">
      <title id="chart-title">Xu hướng AQI minh họa</title>
      <desc id="chart-description">{chart.description}</desc>
      <path className="chart-grid" d="M45 35H580M45 100H580M45 165H580">
      </path>
      <g className="chart-labels">
        <text x="0" y="40">100</text>
        <text x="10" y="105">50</text>
        <text x="20" y="170">0</text>
        <text x="42" y="213">08h</text>
        <text x="145" y="213">12h</text>
        <text x="248" y="213">16h</text>
        <text x="351" y="213">20h</text>
        <text x="454" y="213">00h</text>
        <text x="557" y="213">08h</text>
      </g>
      <path id="chart-area" fill="var(--sage)" opacity=".18" d={chart.area}>
      </path>
      <path key={chart.path} id="chart-line" className="demo-chart-line" fill="none" stroke="var(--olive)" strokeWidth="5" strokeLinecap="round" d={chart.path} strokeDasharray={chart.dash}>
      </path>
      <circle id="chart-dot" cx="563" r="7" fill="var(--olive)" cy={chart.dotY}>
      </circle>
    </svg>
    <p className="data-note" id="chart-caption">{chart.caption}</p>
  </div>);
}
