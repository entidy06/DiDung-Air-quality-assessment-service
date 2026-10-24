import { LandingLink } from "../navigation/landing-link";
export function Features() {
  return (<section className="features wrap" id="features" aria-labelledby="features-title">
    <div>
      <p className="eyebrow">GỌN TRONG MỘT NGƯỜI BẠN NHỎ</p>
      <h2 id="features-title">Đủ điều cần biết.<br />Nhẹ một ngày của bạn.</h2>
    </div>
    <div className="feature-list">
      <LandingLink section="chapter-air">
        <span>01</span>
        <div>
          <strong>AQI & PM2.5 theo khu vực</strong>
          <p>Chỉ số hiện tại, mức phân loại và bản đồ tổng hợp.</p>
        </div>
        <span aria-hidden="true">↗</span>
      </LandingLink>
      <LandingLink section="chapter-weather">
        <span>02</span>
        <div>
          <strong>Thời tiết & lời khuyên</strong>
          <p>Mưa, UV, gió, độ ẩm và gợi ý từ AI.</p>
        </div>
        <span aria-hidden="true">↗</span>
      </LandingLink>
      <LandingLink section="chapter-trend">
        <span>03</span>
        <div>
          <strong>Lịch sử & dự báo</strong>
          <p>Xem những giờ đã qua, cân nhắc những giờ sắp tới.</p>
        </div>
        <span aria-hidden="true">↗</span>
      </LandingLink>
      <LandingLink section="chapter-alert">
        <span>04</span>
        <div>
          <strong>Ngưỡng riêng & thông báo</strong>
          <p>Tài khoản cá nhân, thiết lập và hộp thông báo trong app.</p>
        </div>
        <span aria-hidden="true">↗</span>
      </LandingLink>
    </div>
  </section>);
}
