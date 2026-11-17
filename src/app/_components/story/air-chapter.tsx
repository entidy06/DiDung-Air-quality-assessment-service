import { AirPanel } from "../demo/air-panel";
import Link from "next/link";
export function AirChapter() {
  return (<section className="chapter" id="chapter-air" aria-labelledby="air-title">
    <div className="chapter-copy">
      <span className="chapter-number">01 / HÍT THỞ</span>
      <h2 id="air-title">Nắng đẹp rồi.<br />Không khí thì sao?</h2>
      <p>Không phải điều gì cũng nhìn thấy qua khung cửa. Xem ví dụ AQI và bụi mịn PM2.5 để hiểu DiDung sẽ giúp bạn cân nhắc kế hoạch ra sao.</p>
      <Link className="text-link" href="/auth">Đăng nhập để xem khu vực của bạn ↗</Link>
    </div>
    <AirPanel />
  </section>);
}
