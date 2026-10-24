import { LandingLink } from "../navigation/landing-link";
export function FinalCta() {
  return (<section className="final-cta wrap">
    <span className="eyebrow">MỘT CHÚT CHUẨN BỊ. MỘT NGÀY DỄ CHỊU.</span>
    <h2>Nơi bạn sắp đến,<br />
      <span>hôm nay thế nào?</span>
    </h2>
    <LandingLink className="button primary" section="chapter-air">Xem chất lượng không khí <span aria-hidden="true">↗</span>
    </LandingLink>
    <p>Hiểu không khí. Đọc thời tiết. Tự chọn nhịp đi.</p>
    <span className="cta-flower" aria-hidden="true">✳</span>
  </section>);
}
