import { WeatherDemoPanel } from "../demo/weather-panel";
export function WeatherChapter() {
  return <section className="chapter" id="chapter-weather" aria-labelledby="weather-title">
    <div className="chapter-copy">
      <span className="chapter-number">02 / CHUẨN BỊ</span>
      <h2 id="weather-title">Mang theo chiếc ô,<br />hay một chiếc mũ?</h2>
      <p>Đọc ví dụ về khả năng mưa, gió, độ ẩm và UV. Sau đăng nhập, lời gợi ý dùng dữ liệu của khu vực bạn chọn.</p>
    </div>
    <WeatherDemoPanel />
  </section>;
}
