import { LiveAlertPanel as AlertPanel } from "../live/account-panels";
export function AlertChapter() {
  return (<section className="chapter" id="chapter-alert" aria-labelledby="alert-title">
    <div className="chapter-copy">
      <span className="chapter-number">04 / NHẮC MÌNH</span>
      <h2 id="alert-title">Mỗi người một nhịp.<br />Mỗi người một ngưỡng.</h2>
      <p>Đặt ngưỡng AQI hoặc PM2.5 cho khu vực bạn quan tâm. Khi chạm ngưỡng, DiDung tạo thông báo trong ứng dụng để bạn cân nhắc lại kế hoạch.</p>
    </div>
    <AlertPanel />
    <div className="story-ending">
      <span aria-hidden="true">❧</span>
      <p>Hôm nay đi một vòng,<br />hay hẹn một ngày khác.<br />
        <strong>Bạn hiểu hơn. Bạn chọn.</strong>
      </p>
    </div>
  </section>);
}
