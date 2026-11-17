import Link from "next/link";
export function FinalCta() {
  return (<section className="final-cta wrap">
    <span className="eyebrow">MỘT CHÚT CHUẨN BỊ. MỘT NGÀY DỄ CHỊU.</span>
    <h2>Nơi bạn sắp đến,<br />
      <span>hôm nay thế nào?</span>
    </h2>
    <Link className="button primary" href="/auth">Đăng nhập để xem dữ liệu <span aria-hidden="true">↗</span></Link>
    <p>Hiểu không khí. Đọc thời tiết. Tự chọn nhịp đi.</p>
    <span className="cta-flower" aria-hidden="true">✳</span>
  </section>);
}
