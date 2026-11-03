"use client";

import { useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAccountIdentity, useProfile, useThresholds } from "@/hooks/use-account";
import { useAirQuality, useAirTrend, useMapSnapshot, useWeather } from "@/hooks/use-environment";
import { useLocationStore } from "@/stores/location-store";
import { useMapCanvas } from "@/hooks/use-map-canvas";

function Status({ status, error, empty = "Chưa có dữ liệu cho khu vực này." }: { status: string; error: string | null; empty?: string }) {
  if (status === "ready") return null;
  const message = status === "loading" || status === "idle" ? "Đang tải dữ liệu…" : status === "empty" ? empty : status === "unauthorized" ? "Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại." : error ?? "Không tải được dữ liệu.";
  return <p className={`exp-status${status === "error" || status === "unauthorized" ? " exp-error" : ""}`} role={status === "error" || status === "unauthorized" ? "alert" : "status"}>{message}</p>;
}

function LocationSelect() {
  const { locations, selectedId, select, status, error, load } = useLocationStore();
  return <div className="exp-location-control">
    <label htmlFor="exp-location">Khu vực đang xem</label>
    <select id="exp-location" value={selectedId} onChange={event => select(event.target.value)} disabled={status !== "ready" || !locations.length}>
      {!locations.length && <option value="">{status === "loading" || status === "idle" ? "Đang tải khu vực…" : "Chưa có khu vực"}</option>}
      {locations.map(location => <option key={location.id} value={location.id}>{location.name}, TP.HCM</option>)}
    </select>
    {status === "error" && <p className="exp-status exp-error" role="alert">{error} <button type="button" onClick={() => void load()}>Thử lại</button></p>}
  </div>;
}

function AirCard() {
  const vm = useAirQuality();
  return <section className="exp-card exp-raised" aria-labelledby="exp-air-title">
    <h2 id="exp-air-title">Chất lượng không khí</h2>
    <Status status={vm.status} error={vm.error} />
    {vm.status === "ready" && <><div className="exp-aqi-main"><strong data-level={vm.air.level}>{vm.air.value}</strong><div><span className="exp-aqi-pill" data-level={vm.air.level}>{vm.air.label}</span><p>US AQI · ước tính mô hình</p></div></div><p className="exp-data-label">PM2.5 {vm.pm}{vm.pm !== "—" && " µg/m³"} · {vm.source} · Dữ liệu mô hình · hiệu lực {vm.time}{vm.stale && " · Dữ liệu cũ"}</p></>}
  </section>;
}

function WeatherCard() {
  const vm = useWeather();
  return <section className="exp-card exp-raised" aria-labelledby="exp-weather-title"><h2 id="exp-weather-title">Thời tiết tại khu vực</h2>
    <Status status={vm.weather.status} error={vm.weather.error} />
    {vm.weather.status === "ready" && <><div className="exp-weather-stats">{vm.tiles.map(tile => <div className="exp-inset" key={tile.label}><span>{tile.label}</span><b>{tile.value}{tile.value !== "—" && tile.unit}</b></div>)}</div><p className="exp-data-label">{vm.weather.data?.source} · hiệu lực {vm.time}{vm.stale && " · Dữ liệu cũ"}</p></>}
  </section>;
}

function TrendCard() {
  const vm = useAirTrend();
  const id = useId();
  return <section className="exp-card exp-raised exp-trend-card" aria-labelledby="exp-trend-title"><h2 id="exp-trend-title">AQI theo giờ</h2>
    <div className="exp-segmented" role="group" aria-label="Khoảng thời gian"><button type="button" aria-pressed={vm.period === "history"} onClick={() => vm.setPeriod("history")}>Lịch sử</button><button type="button" aria-pressed={vm.period === "forecast"} onClick={() => vm.setPeriod("forecast")}>Dự báo</button></div>
    <Status status={vm.status} error={vm.error} empty="Chưa có mốc AQI trong khoảng thời gian này." />
    {vm.status === "ready" && (vm.chart.count ? <><svg className="exp-live-chart" viewBox="0 0 600 230" role="img" aria-labelledby={`${id}-title ${id}-desc`}><title id={`${id}-title`}>Xu hướng US AQI</title><desc id={`${id}-desc`}>{vm.chart.description}</desc><path d="M45 35H580M45 100H580M45 165H580" fill="none" stroke="var(--sage)" /><path d={vm.chart.path} fill="none" stroke={vm.period === "forecast" ? "var(--orange)" : "var(--olive)"} strokeWidth="4" strokeDasharray={vm.chart.dash} strokeLinecap="round" />{vm.chart.labels.map((label, index) => <text key={index} x={label.x} y="215" textAnchor="middle" fill="var(--brown)" fontSize="12">{label.text}</text>)}</svg><p className="exp-data-label">{vm.chart.caption}</p></> : <p className="exp-status">Chưa có mốc AQI trong khoảng thời gian này.</p>)}
  </section>;
}

function AdviceCard() {
  const vm = useWeather();
  return <section className="exp-card exp-raised" aria-labelledby="exp-advice-title"><h2 id="exp-advice-title">Lời gợi ý</h2><Status status={vm.advice.status} error={vm.advice.error} empty="Chưa có lời gợi ý cho khu vực này." />
    {vm.advice.status === "ready" && vm.advice.data && <div className="exp-advice"><h3>{vm.advice.data.summary}</h3><p>{vm.advice.data.action}</p>{vm.advice.data.note && <p>{vm.advice.data.note}</p>}</div>}
    <p className="exp-data-label">{vm.advice.data ? `Hiệu lực ${vm.adviceTime} · AI: ${vm.advice.data.model}. ` : ""}Gợi ý tổng quát, không thay thế tư vấn y tế.</p>
  </section>;
}

function MapCard() {
  const vm = useMapSnapshot();
  const { container, error, configured } = useMapCanvas(vm.items, vm.selectedId, vm.select);
  return <section className="exp-card exp-raised" id="app-map" aria-labelledby="exp-map-title"><h2 id="exp-map-title">Bản đồ khu vực</h2><Status status={vm.status} error={vm.error} />
    {configured ? <div className="exp-map-canvas" ref={container} aria-label="Bản đồ AQI tại TP.HCM" /> : <p className="exp-status">Chưa cấu hình token Mapbox. Bạn vẫn có thể chọn khu vực bằng danh sách phía trên.</p>}
    {error && <p className="exp-status exp-error" role="alert">{error}</p>}
    <p className="exp-data-label">Open-Meteo / CAMS · Dữ liệu mô hình. Nhiều khu vực có thể cùng giá trị AQI.</p>
  </section>;
}

function ThresholdCard({ scope }: { scope: string }) {
  const vm = useThresholds(scope);
  return <section className="exp-card exp-raised" id="app-thresholds" aria-labelledby="exp-threshold-title"><h2 id="exp-threshold-title">Ngưỡng của tôi</h2><Status status={vm.resource.status} error={vm.resource.error} empty="Bạn chưa lưu ngưỡng nào." />
    {vm.resource.status === "ready" && (!vm.items.length ? <p className="exp-status">Bạn chưa lưu ngưỡng nào.</p> : <ul className="exp-threshold-list">{vm.items.map(item => <li key={item.id}><div><strong>{item.metricLabel}</strong><span>{item.locationName} · {item.is_active ? "Đang bật" : "Đang tắt"}</span></div><b>{item.value}</b><button type="button" onClick={() => vm.edit(item)}>Sửa</button><button type="button" onClick={() => void vm.toggle(item)} disabled={vm.mutation.pending}>{item.is_active ? "Tắt" : "Bật"}</button><button type="button" onClick={() => void vm.remove(item)} disabled={vm.mutation.pending}>Xóa</button></li>)}</ul>)}
    <form className="exp-threshold-form" onSubmit={event => { event.preventDefault(); void vm.save(); }}><label>Chỉ số<select value={vm.metric} onChange={event => vm.setMetric(event.target.value as "aqi" | "pm25")} disabled={!!vm.editing || vm.mutation.pending}><option value="aqi">US AQI</option><option value="pm25">PM2.5 (µg/m³)</option></select></label><label>Ngưỡng<input type="number" min={vm.metric === "aqi" ? 1 : 0.1} step={vm.metric === "aqi" ? 1 : 0.1} value={vm.value} onChange={event => vm.setValue(event.target.value)} disabled={vm.mutation.pending} required /></label><button className="exp-button exp-orange" type="submit" disabled={!vm.canSave || vm.mutation.pending}>{vm.editing ? "Lưu thay đổi" : "Thêm ngưỡng"}</button>{vm.editing && <button className="exp-button" type="button" onClick={vm.cancel}>Hủy</button>}</form>
    {(vm.validation || vm.mutation.error) && <p className="exp-status exp-error" role="alert">{vm.validation || vm.mutation.error}</p>}{vm.mutation.message && <p className="exp-status" role="status">{vm.mutation.message}</p>}
  </section>;
}

export function DashboardExperience() {
  const router = useRouter();
  const auth = useAccountIdentity();
  const profile = useProfile(auth.scope);
  const location = useLocationStore(state => state.locations.find(item => item.id === state.selectedId));
  useEffect(() => { if (!auth.loading && !auth.user) router.replace("/auth"); }, [auth.loading, auth.user, router]);
  if (auth.loading || !auth.user) return <main id="main-content" className="exp-wrap"><p className="exp-status">Đang kiểm tra phiên đăng nhập…</p></main>;
  const name = profile.resource.data?.display_name || auth.user.user_metadata?.full_name || auth.user.email || "Tài khoản";
  return <main id="main-content" className="exp-app-shell">
    <aside className="exp-sidebar"><Link className="exp-brand" href="/app">DiDung</Link><nav aria-label="Điều hướng khu vực riêng"><a className="current" href="#main-content">Tổng quan</a><a href="#app-map">Bản đồ</a><a href="#app-thresholds">Ngưỡng của tôi</a></nav><div className="exp-sidebar-bottom"><span>{name}</span><button type="button" onClick={() => void profile.signOut()} disabled={profile.signingOut}>{profile.signingOut ? "Đang đăng xuất…" : "Đăng xuất"}</button>{profile.signOutError && <p role="alert">{profile.signOutError}</p>}</div></aside>
    <div className="exp-app-content"><div className="exp-app-top"><div><h1>Điều kiện hôm nay</h1><p>{location ? `Dữ liệu để tham khảo tại ${location.name}` : "Dữ liệu để tham khảo trước khi ra ngoài"}</p></div><LocationSelect /></div>
      <div className="exp-app-grid"><AirCard /><WeatherCard /><TrendCard /><AdviceCard /><MapCard /><ThresholdCard scope={auth.scope} /></div>
      <p className="exp-app-footer">AQI và thời tiết là dữ liệu mô hình, không phải số đo tại địa chỉ cụ thể. Hãy kiểm tra nguồn và thời điểm hiệu lực trước khi quyết định.</p>
    </div>
  </main>;
}
