export function LandingDemoToolbar() {
  return <div className="live-toolbar wrap" aria-label="Phạm vi minh họa">
    <label className="live-field">Khu vực tại TP. Hồ Chí Minh
      <select disabled aria-label="Khu vực minh họa"><option>Khu vực minh họa · TP.HCM</option></select>
    </label>
    <p className="data-note">Minh họa · không phải dữ liệu hiện tại<br />Đăng nhập để chọn khu vực và xem dữ liệu mô hình.</p>
  </div>;
}
