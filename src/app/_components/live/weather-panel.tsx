"use client";
import { useWeather } from "@/hooks/use-environment";
import { ResourceNotice } from "./resource-notice";
export function LiveWeatherPanel() {
  const vm = useWeather();
  return <>
    <ResourceNotice {...vm.weather} />{vm.weather.status === "ready" && <>
      <div className="weather-grid">{vm.tiles.map(tile => <div className="weather-tile" key={tile.label}>
        <span className="weather-icon" aria-hidden="true">{tile.icon}</span>
        <span>{tile.label}</span>
        <strong>{tile.value}<small>{tile.value !== "—" && tile.unit}</small>
        </strong>
      </div>)}</div>
      <p className="data-note">{vm.weather.data?.source} · Hiệu lực {vm.time}{vm.stale && " · Dữ liệu cũ"}</p>
    </>}<div className="advice">
      <span className="advice-flower" aria-hidden="true">✿</span>
      <div>
        <span className="eyebrow">MỘT LỜI GỢI Ý NHỎ</span>
        <ResourceNotice {...vm.advice} />{vm.advice.data && <>
          <h3>{vm.advice.data.summary}</h3>
          <p>{vm.advice.data.action}</p>{vm.advice.data.note && <p>{vm.advice.data.note}</p>}<p className="data-note">Hiệu lực {vm.adviceTime} · AI: {vm.advice.data.model}</p>
        </>}<span className="data-note">Lời khuyên tổng quát, không thay thế tư vấn y tế.</span>
      </div>
    </div>
    <div className="live-actions">
      <button className="button small" type="button" onClick={vm.weather.reload}>Làm mới thời tiết</button>
      <button className="button small" type="button" onClick={vm.advice.reload}>Làm mới lời khuyên</button>
    </div>
  </>;
}
