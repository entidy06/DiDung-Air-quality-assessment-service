import type { Metadata } from "next";
import { AirChapter } from "../_components/story/air-chapter";
export const metadata: Metadata = { title: "Chất lượng không khí" };
export default function Page() {
  return <main id="main-content">
    <h1 className="sr-only">Chất lượng không khí</h1>
    <div className="wrap route-content">
      <AirChapter />
    </div>
  </main>;
}
