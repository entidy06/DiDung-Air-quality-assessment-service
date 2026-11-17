"use client";
import { LandingLink } from "../navigation/landing-link";
import Image from "next/image";
import { useStoryChapter } from "@/hooks/use-landing-demo";
export function StoryRail() {
  const activeChapter = useStoryChapter();
  return (<aside className="story-rail" aria-label="Các chương câu chuyện">
    <span className="rail-label">TRƯỚC KHI MỞ CỬA</span>
    <LandingLink section="chapter-air" data-chapter="chapter-air" aria-current={activeChapter === "chapter-air" ? "step" : undefined}>
      <span>01</span> Hít thở</LandingLink>
    <LandingLink section="chapter-weather" data-chapter="chapter-weather" aria-current={activeChapter === "chapter-weather" ? "step" : undefined}>
      <span>02</span> Chuẩn bị</LandingLink>
    <LandingLink section="chapter-trend" data-chapter="chapter-trend" aria-current={activeChapter === "chapter-trend" ? "step" : undefined}>
      <span>03</span> Chọn lúc</LandingLink>
    <LandingLink section="chapter-alert" data-chapter="chapter-alert" aria-current={activeChapter === "chapter-alert" ? "step" : undefined}>
      <span>04</span> Nhắc mình</LandingLink>
    <Image src="/images/soft-garden.svg" alt="" aria-hidden="true" width={200} height={194} />
    <p>Mỗi chuyến đi,<br />thêm một chút hiểu mình.</p>
  </aside>);
}
