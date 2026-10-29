import { LandingLink } from "../navigation/landing-link";
import Image from "next/image";
export function Hero() {
  return (<section id="home" className="hero wrap" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow">
        <span className="tiny-leaf" aria-hidden="true">❧</span> MỘT NGƯỜI BẠN NHỎ, TRƯỚC MỖI CHUYẾN ĐI</p>
      <h1 id="hero-title">Ngoài kia có<br />một ngày <span className="scribble">dễ chịu.</span>
      </h1>
      <p className="intro">Một vòng đi bộ. Một cuộc hẹn. Một góc phố quen.<br />Trước khi mở cửa, cùng DiDung nhìn xem không khí và thời tiết hôm nay nhé.</p>
      <LandingLink className="button primary" section="chapter-air">Cùng mình ra ngoài <span aria-hidden="true">↓</span>
      </LandingLink>
      <div className="hero-foot">
        <span className="handwritten">chuẩn bị một chút, an tâm hơn một chút</span>
        <svg viewBox="0 0 76 37" aria-hidden="true">
          <path d="M3 4Q52 43 69 9m-12 2 13-5 3 14">
          </path>
        </svg>
      </div>
    </div>
    <div className="hero-art">
      <span className="art-note note-top">Sài Gòn, mình đi đâu nhỉ?</span>
      <Image src="/images/soft-garden.svg" alt="Bạn Mầm nhỏ với hai chiếc lá, đang đi trên con đường uốn lượn giữa cây xanh, mây và mặt trời bằng những khối bo tròn mềm mại." width={680} height={660} preload={true} />
      <span className="art-note note-bottom">
        <span aria-hidden="true">✦</span> Chậm một nhịp. Hiểu thêm một chút.</span>
      <span className="doodle-star" aria-hidden="true">✧</span>
    </div>
    <div className="hero-bottom">
      <span>ĐƯỢC THIẾT KẾ CHO NHỮNG NGÀY Ở TP. HỒ CHÍ MINH</span>
      <LandingLink section="chapter-air">Xem câu chuyện minh họa <span aria-hidden="true">↗</span>
      </LandingLink>
    </div>
  </section>);
}
