import type { Metadata } from "next";
import { MapPreview } from "../_components/story/map-preview";
export const metadata: Metadata = { title: "Bản đồ minh họa" };
export default function Page() {
  return <main id="main-content">
    <h1 className="sr-only">Bản đồ minh họa</h1>
    <div className="wrap route-content">
      <MapPreview expanded />
    </div>
  </main>;
}
