import { LiveWeatherPanel } from "../live/weather-panel";
export function WeatherChapter() {
  return <section className="chapter" id="chapter-weather" aria-labelledby="weather-title">
    <div className="chapter-copy">
      <span className="chapter-number">02 / CHUẨN BỊ</span>
      <h2 id="weather-title">Mang theo chiếc ô,<br />hay một chiếc mũ?</h2>
      <p>Đọc cùng lúc khả năng mưa, gió, độ ẩm và UV. Thêm một lời gợi ý ngắn để biến những con số thành điều dễ hiểu trước khi đi.</p>
    </div>
    <LiveWeatherPanel />
  </section>;
}
