"use client";
import { useId } from "react";
import { useAirTrend } from "@/hooks/use-environment";
import { ResourceNotice } from "./resource-notice";
export function LiveTrendPanel() {
  const vm = useAirTrend();
  const id = useId();
  return <div className="soft-panel trend-panel">
    <div className="panel-top">
      <h3>Một ngày, nhiều nhịp thở.</h3>
      <span className="pill">DỮ LIỆU MÔ HÌNH</span>
    </div>
    <div className="segmented" role="group" aria-label="Khoảng thời gian biểu đồ">
      <button type="button" aria-pressed={vm.period === "history"} onClick={() => vm.setPeriod("history")}>24 giờ qua</button>
      <button type="button" aria-pressed={vm.period === "forecast"} onClick={() => vm.setPeriod("forecast")}>24 giờ tới</button>
    </div>
    <ResourceNotice {...vm} empty={vm.status === "ready" && !vm.chart.count} />{vm.status === "ready" && vm.chart.count > 0 && <>
      <div className="chart-head">
        <span>US AQI · Open-Meteo / CAMS</span>
        <span>{vm.chart.title}</span>
      </div>
      <svg className="chart" viewBox="0 0 600 230" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>Xu hướng US AQI</title>
        <desc id={`${id}-desc`}>{vm.chart.description}</desc>
        <path className="chart-grid" d="M45 35H580M45 100H580M45 165H580" />
        <g className="chart-labels">
          <text x="0" y="40">{vm.chart.max}</text>
          <text x="0" y="105">{vm.chart.middle}</text>
          <text x="20" y="170">0</text>{vm.chart.labels.map((label, index) => <text key={index} x={label.x} y="213" textAnchor="middle">{label.text}</text>)}</g>
        <path d={vm.chart.path} fill="none" stroke="var(--olive)" strokeWidth="4" strokeDasharray={vm.chart.dash} />{vm.chart.points.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="3" fill="var(--olive)" />)}</svg>
      <p className="data-note">{vm.chart.caption}</p>
    </>}<div className="live-actions">
      <button className="button small" type="button" onClick={vm.reload} disabled={vm.status === "loading"}>Làm mới</button>
    </div>
  </div>;
}
