"use client";
import { useId } from "react";
import { useLocationStore } from "@/stores/location-store";
export function LocationPicker() {
  const id = useId();
  const { locations, selectedId, status, error, load, select } = useLocationStore();
  return <div className="live-toolbar wrap">
    <label className="live-field" htmlFor={id}>Khu vực tại TP. Hồ Chí Minh<select id={id} value={selectedId} onChange={event => select(event.target.value)} disabled={status !== "ready" || !locations.length}>{!locations.length && <option value="">{status === "loading" || status === "idle" ? "Đang tải khu vực…" : "Chưa có khu vực"}</option>}{locations.map(location => <option key={location.id} value={location.id}>{location.name}</option>)}</select>
    </label>
    <p className="data-note">Open-Meteo / CAMS · Dữ liệu mô hình<br />Không phải số đo tại địa chỉ của bạn.</p>{status === "error" && <div className="live-status error" role="alert">{error}<button className="button small" onClick={() => void load()}>Thử lại</button>
    </div>}</div>;
}
