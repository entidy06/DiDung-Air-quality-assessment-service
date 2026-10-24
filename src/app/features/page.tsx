import type { Metadata } from "next";
import { Features } from "../_components/landing/features";
export const metadata: Metadata = { title: "DiDung có gì?" };
export default function Page() {
  return <main id="main-content">
    <h1 className="sr-only">DiDung có gì?</h1>
    <Features />
  </main>;
}
