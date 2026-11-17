"use client";
import Link from "next/link";
type Props = { status: string; error?: string | null; reload?: () => void; empty?: boolean };
export function ResourceNotice({ status, error, reload, empty }: Props) {
  if (status === "unauthorized") return <p className="live-status">Đăng nhập để sử dụng tính năng này. <Link className="text-link" href="/login">Đăng nhập ↗</Link>
  </p>;
  if (status === "error") return <div className="live-status error" role="alert">{error || "Không tải được dữ liệu."}{reload && <button className="button small" type="button" onClick={reload}>Thử lại</button>}</div>;
  if (status === "loading") return <p className="live-status" role="status">Đang tải dữ liệu…</p>;
  if (status === "idle") return <p className="live-status">Chọn khu vực để xem dữ liệu.</p>;
  if (status === "empty" || empty) return <p className="live-status empty">Chưa có dữ liệu.</p>;
  return null;
}
