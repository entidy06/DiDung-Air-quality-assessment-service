import type { Metadata } from "next";
import { AlertChapter } from "../_components/story/alert-chapter";
export const metadata: Metadata = { title: "Ngưỡng riêng & thông báo" };
export default function Page() {
  return <main id="main-content">
    <h1 className="sr-only">Ngưỡng riêng & thông báo</h1>
    <div className="wrap route-content">
      <AlertChapter />
    </div>
  </main>;
}
