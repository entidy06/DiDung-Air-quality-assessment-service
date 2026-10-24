import type { Metadata } from "next";
import { Story } from "../_components/story/story";
export const metadata: Metadata = { title: "Câu chuyện" };
export default function Page() {
  return <main id="main-content">
    <h1 className="sr-only">Câu chuyện</h1>
    <Story />
  </main>;
}
