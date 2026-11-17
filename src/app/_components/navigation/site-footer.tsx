import { LandingLink } from "./landing-link";
export function SiteFooter() {
  return (<footer className="wrap">
    <LandingLink className="brand" section="home">
      <span className="brand-sprout" aria-hidden="true">✳</span>DiDung.</LandingLink>
    <p>Một người bạn nhỏ trước khi ra ngoài.<br />Đồ án Introduction to Software Engineering · HCMUS</p>
    <LandingLink section="sources">Nguồn & giới hạn ↗</LandingLink>
  </footer>);
}
