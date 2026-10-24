import type { Metadata } from "next";
import { ProfilePanel } from "../_components/live/account-panels";
export const metadata: Metadata = { title: "Tài khoản" };
export default function ProfilePage() {
  return <main id="main-content" className="wrap route-content">
    <h1 className="sr-only">Tài khoản của bạn</h1>
    <ProfilePanel />
  </main>;
}
