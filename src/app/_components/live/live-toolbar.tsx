"use client";
import { usePathname } from "next/navigation";
import { LocationPicker } from "./location-picker";
export function LiveToolbar() {
  const pathname = usePathname();
  if (pathname === "/demo") return <div className="preview-note">BẢN MINH HỌA · Số liệu mẫu, không lưu thiết lập</div>;
  if (pathname === "/login" || pathname === "/profile") return null;
  return <LocationPicker />;
}
