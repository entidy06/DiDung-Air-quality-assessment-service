"use client";
import { useAirQuality } from "@/hooks/use-environment";
import { ResourceNotice } from "./resource-notice";
export function LiveAirPanel() {
  const vm = useAirQuality();
  return <div className="soft-panel air-panel" data-state={vm.air.level}>
    <div className="panel-top">
      <span className="location-label">⌖ {vm.locationName} · TP.HCM</span>
      <span className="pill">DỮ LIỆU MÔ HÌNH</span>
    </div>
    <ResourceNotice {...vm} />{vm.status === "ready" && <>
      <div className="aqi-layout">
        <div>
          <span className="meta">CHẤT LƯỢNG KHÔNG KHÍ · US AQI</span>
          <div className="aqi-number">{vm.air.value}</div>
          <span className="status">● {vm.air.label}</span>
        </div>
        <div className="breathing-buddy" aria-hidden="true">
          <i />
          <b>•‿•</b>
          <span />
        </div>
      </div>
      <div className="aqi-scale" aria-label="Tốt, trung bình, nhạy cảm, xấu">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="air-meta">
        <span>PM2.5<strong>{vm.pm}{vm.pm !== "—" && " µg/m³"}</strong>
        </span>
        <span>Hiệu lực<strong>{vm.time}</strong>
        </span>
      </div>
      <p className="data-note">{vm.source} · Dữ liệu mô hình</p>{vm.stale && <p className="live-status">Dữ liệu cũ. Hãy cân nhắc thời điểm hiệu lực trước khi ra ngoài.</p>}</>}<div className="live-actions">
      <button className="button small" type="button" onClick={vm.reload} disabled={vm.status === "loading" || vm.status === "idle"}>Làm mới ↻</button>
    </div>
  </div>;
}
