import type { Metadata } from "next";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { SiteHeader } from "./_components/navigation/site-header";
import { SiteFooter } from "./_components/navigation/site-footer";
import { AppProvider } from "./_components/live/app-provider";
import { LiveToolbar } from "./_components/live/live-toolbar";
export const metadata: Metadata = {
  title: {
    default: "DiDung — Một chút chuẩn bị, một ngày dễ chịu",
    template: "%s | DiDung",
  },
  description: "Hỗ trợ quyết định khi ra ngoài tại TP. Hồ Chí Minh",
};
export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (<html lang="vi">
    <body>
      <a className="skip" href="#main-content">Đến nội dung chính</a>
      <AppProvider>
        <SiteHeader />
        <LiveToolbar />
        {children}
        <SiteFooter />
      </AppProvider>
    </body>
  </html>);
}
