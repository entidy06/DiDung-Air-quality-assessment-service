import type { Metadata } from "next";
import { Sources } from "../_components/landing/sources";
export const metadata: Metadata = { title: "Nguồn dữ liệu" };
export default function Page() {
  return <main id="main-content">
    <h1 className="sr-only">Nguồn dữ liệu</h1>
    <Sources />
  </main>;
}
