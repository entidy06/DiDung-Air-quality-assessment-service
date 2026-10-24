import { LandingLink } from "../navigation/landing-link";
export function Sources() {
  return (<section className="sources wrap" id="sources" aria-labelledby="sources-title">
    <div className="source-leaf" aria-hidden="true">❧</div>
    <div>
      <p className="eyebrow">HIỂU DỮ LIỆU, TIN CÓ CƠ SỞ</p>
      <h2 id="sources-title">Một con số tốt<br />cần một nguồn rõ ràng.</h2>
      <p>DiDung dùng dữ liệu mô hình từ Open-Meteo. Mỗi kết quả cần đi cùng nguồn và thời điểm hiệu lực, để bạn biết mình đang đọc điều gì.</p>
      <details id="source-model">
        <summary>Dữ liệu mô hình có nghĩa là gì?</summary>
        <p>AQI và PM2.5 được ước tính từ mô hình CAMS qua Open-Meteo, không phải số đo tại địa chỉ của bạn. Nhiều địa điểm có thể cùng nằm trong một ô lưới và có giá trị giống nhau.</p>
      </details>
      <details>
        <summary>Nếu thiếu dữ liệu thì sao?</summary>
        <p>Hiển thị “Chưa có dữ liệu”, không thay bằng số minh họa hoặc trạng thái tốt. Lỗi kết nối, đang tải và dữ liệu cũ cần trạng thái riêng khi tích hợp.</p>
      </details>
      <details>
        <summary>DiDung hiện hỗ trợ điều gì?</summary>
        <p>DiDung kết nối API không khí, thời tiết, lời khuyên, lịch sử, dự báo, bản đồ và cảnh báo cá nhân. Các trang chức năng dùng dữ liệu backend; trang /demo có nhãn minh họa riêng. Cảnh báo ngập, nhiệt độ, chỉ đường và thông báo đẩy chưa thuộc phạm vi hiện tại.</p>
      </details>
      <LandingLink className="text-link" section="source-model">Tìm hiểu dữ liệu mô hình ↓</LandingLink>
    </div>
  </section>);
}
