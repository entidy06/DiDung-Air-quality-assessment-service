import { LiveTrendPanel as TrendPanel } from "../live/trend-panel";
export function TrendChapter() {
  return (<section className="chapter" id="chapter-trend" aria-labelledby="trend-title">
    <div className="chapter-copy">
      <span className="chapter-number">03 / CHỌN LÚC</span>
      <h2 id="trend-title">Đi bây giờ,<br />hay chậm lại một chút?</h2>
      <p>Một con số kể chuyện hiện tại. Một đường xu hướng cho bạn thêm góc nhìn: xem diễn biến đã qua và dự báo AQI, PM2.5 trong những giờ sắp tới.</p>
    </div>
    <TrendPanel />
    <p className="chapter-aside">Dự báo là một góc nhìn để cân nhắc, không phải lời hứa về một “giờ an toàn”.</p>
  </section>);
}
