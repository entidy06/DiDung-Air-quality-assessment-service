"use client";
import { useMapSnapshot } from "@/hooks/use-environment";
import { useMapCanvas } from "@/hooks/use-map-canvas";
import { ResourceNotice } from "./resource-notice";
export function MapPanel() {
  const vm = useMapSnapshot();
  const { container, error, configured } = useMapCanvas(vm.items, vm.selectedId, vm.select);
  return <div className="soft-panel">
    <h3>Các khu vực quanh bạn</h3>
    <ResourceNotice {...vm} />{configured ? <div className="live-map" ref={container} aria-label="Bản đồ chất lượng không khí TP.HCM" /> : <p className="live-status">Chưa cấu hình token Mapbox. Bạn vẫn có thể chọn khu vực và đọc dữ liệu thật trong danh sách.</p>}{error && <p className="live-status error" role="alert">{error}</p>}<p className="data-note">Open-Meteo / CAMS · Dữ liệu mô hình. Các địa điểm gần nhau có thể có cùng chỉ số.</p>
    <ul className="live-list map-list">{vm.items.map(item => <li key={item.location_id}>
      <strong>{item.name} · US AQI {item.air.value}</strong>
      <p>{item.air.label} · PM2.5 {item.pm}{item.pm !== "—" && " µg/m³"}</p>
      <span className="data-note">{item.time}{item.stale && " · Dữ liệu cũ"}</span>
      <button className="button small" type="button" aria-pressed={vm.selectedId === item.location_id} onClick={() => vm.select(item.location_id)}>{vm.selectedId === item.location_id ? "Đang chọn" : "Chọn khu vực"}</button>
    </li>)}</ul>
    <button className="button small" type="button" onClick={vm.reload}>Làm mới bản đồ</button>
  </div>;
}
