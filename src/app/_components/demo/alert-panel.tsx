import Link from "next/link";
export function AlertPanel() {
  return (<div className="soft-panel alert-panel">
    <div className="panel-top">
      <h3>Ngưỡng phù hợp với bạn</h3>
      <span className="bell" aria-hidden="true">♧</span>
    </div>
    <p>Đăng nhập để chọn khu vực, đặt ngưỡng AQI hoặc PM2.5 của riêng bạn và xem thông báo trong ứng dụng.</p>
    <Link className="button small primary" href="/auth">Đăng nhập để đặt ngưỡng ↗</Link>
  </div>);
}
