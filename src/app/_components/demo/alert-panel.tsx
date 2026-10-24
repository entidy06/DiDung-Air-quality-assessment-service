"use client";
import { useThresholdDemo } from "@/hooks/use-landing-demo";
export function AlertPanel() {
  const { threshold, notificationCopy, setThreshold } = useThresholdDemo();
  return (<div className="soft-panel alert-panel">
    <div className="panel-top">
      <h3>Một lời nhắc dành cho bạn</h3>
      <span className="bell" aria-hidden="true">♧</span>
    </div>
    <label htmlFor="threshold">Nhắc khi US AQI đạt từ <output id="threshold-value" htmlFor="threshold">{threshold}</output>
    </label>
    <input id="threshold" type="range" min="25" max="200" step="5" value={threshold} onChange={(event) => setThreshold(event.target.valueAsNumber)} />
    <div className="range-labels">
      <span>25</span>
      <span>200</span>
    </div>
    <div className="notification">
      <span className="notification-icon" aria-hidden="true">!</span>
      <div>
        <strong>AQI chạm ngưỡng bạn đặt</strong>
        <p id="notification-copy">{notificationCopy}</p>
        <span>Thông báo trong ứng dụng · Minh họa</span>
      </div>
    </div>
    <p className="data-note">Kéo thanh để xem ví dụ. Chưa lưu thiết lập; tính năng cá nhân cần đăng nhập khi tích hợp. Không phải thông báo đẩy hay email.</p>
  </div>);
}
