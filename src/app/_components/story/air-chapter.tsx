import { LandingLink } from "../navigation/landing-link";
import { LiveAirPanel as AirPanel } from "../live/air-panel";
import { MapPreview } from "./map-preview";
export function AirChapter() {
  return (<section className="chapter" id="chapter-air" aria-labelledby="air-title">
    <div className="chapter-copy">
      <span className="chapter-number">01 / HÍT THỞ</span>
      <h2 id="air-title">Nắng đẹp rồi.<br />Không khí thì sao?</h2>
      <p>Không phải điều gì cũng nhìn thấy qua khung cửa. Chọn khu vực sắp đến để xem AQI và bụi mịn PM2.5, trước khi quyết định kế hoạch của mình.</p>
      <LandingLink className="text-link" section="map-preview">Nhìn thêm những khu vực quanh bạn ↗</LandingLink>
    </div>
    <AirPanel />
    <MapPreview />
  </section>);
}
