"use client";
import { useAirDemo } from "@/hooks/use-landing-demo";
export function AirPanel() {
  const { scenario, example, setScenario } = useAirDemo();
  return (<div className="soft-panel air-panel" id="try" data-state={scenario}>
    <div className="panel-top">
      <span className="location-label">⌖ Khu vực minh họa · TP.HCM</span>
      <span className="pill">VÍ DỤ</span>
    </div>
    <div className="aqi-layout">
      <div>
        <span className="meta">CHẤT LƯỢNG KHÔNG KHÍ · US AQI</span>
        <div className="aqi-number" id="aqi-number">{example.aqi}</div>
        <span className="status" id="aqi-status">{example.status}</span>
      </div>
      <div className="breathing-buddy" aria-hidden="true">
        <i>
        </i>
        <b>•‿•</b>
        <span>
        </span>
      </div>
    </div>
    <div className="aqi-scale" aria-label="Bốn mức phân loại của ứng dụng: tốt, trung bình, nhạy cảm, xấu">
      <span>
      </span>
      <span>
      </span>
      <span>
      </span>
      <span>
      </span>
    </div>
    <div className="air-meta">
      <span>PM2.5 <strong id="pm-value">{example.pm}</strong>
      </span>
      <span>Hiệu lực minh họa <strong>08:00 · UTC+7</strong>
      </span>
    </div>
    <p className="data-note">Nguồn khi kết nối: Open-Meteo / CAMS · Dữ liệu mô hình</p>
    <fieldset className="scenarios">
      <legend>Đổi tình huống để xem bản vẽ</legend>
      <button type="button" data-scenario="good" aria-pressed={scenario === "good"} onClick={() => setScenario("good")}>Tốt</button>
      <button type="button" data-scenario="bad" aria-pressed={scenario === "bad"} onClick={() => setScenario("bad")}>Xấu</button>
      <button type="button" data-scenario="missing" aria-pressed={scenario === "missing"} onClick={() => setScenario("missing")}>Thiếu dữ liệu</button>
    </fieldset>
    <p id="scenario-note" className="scenario-note" aria-live="polite">{example.note}</p>
  </div>);
}
