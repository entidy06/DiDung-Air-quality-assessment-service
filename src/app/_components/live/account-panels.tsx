"use client";
import Link from "next/link";
import { useAccountIdentity, useNotifications, useProfile, useThresholds } from "@/hooks/use-account";
import { ResourceNotice } from "./resource-notice";
import { LandingLink } from "../navigation/landing-link";

function MutationNotice({ error, message }: { error: string; message: string }) {
  return <>{error && <p className="live-status error" role="alert">{error}</p>}{message && <p className="live-status" role="status">{message}</p>}</>;
}
export function AccountGate({ children }: { children: (scope: string) => React.ReactNode }) {
  const auth = useAccountIdentity();
  if (auth.loading) return <p className="live-status" role="status">Đang kiểm tra phiên đăng nhập…</p>;
  if (!auth.user) return <div className="soft-panel">
    <p>{auth.error || "Đăng nhập để lưu ngưỡng, xem thông báo và chỉnh sửa tài khoản."}</p>
    <Link className="button primary" href="/login">Đăng nhập ↗</Link>
  </div>;
  return children(auth.scope);
}
function Thresholds({ scope }: { scope: string }) {
  const vm = useThresholds(scope);
  return <div className="soft-panel alert-panel">
    <h3>Ngưỡng riêng của bạn</h3>
    <ResourceNotice {...vm.resource} />
    <form onSubmit={event => { event.preventDefault(); void vm.save(); }} className="live-form">
      <label className="live-field" htmlFor="threshold-metric">Chỉ số<select id="threshold-metric" value={vm.metric} onChange={event => vm.setMetric(event.target.value as "aqi" | "pm25")} disabled={!!vm.editing || vm.mutation.pending}>
        <option value="aqi">US AQI</option>
        <option value="pm25">PM2.5 (µg/m³)</option>
      </select>
      </label>
      <label className="live-field" htmlFor="live-threshold-value">{vm.editing ? "Sửa ngưỡng đã lưu" : "Nhắc khi khu vực đang chọn đạt từ"}<input id="live-threshold-value" type="number" min={vm.metric === "aqi" ? 1 : 0.1} step={vm.metric === "aqi" ? 1 : 0.1} required value={vm.value} onChange={event => vm.setValue(event.target.value)} disabled={vm.mutation.pending} />
      </label>{vm.validation && <p className="live-status error" role="alert">{vm.validation}</p>}<div className="live-actions">
        <button className="button primary" disabled={!vm.canSave || vm.mutation.pending} type="submit">{vm.mutation.pending ? "Đang lưu…" : vm.editing ? "Lưu thay đổi" : "Lưu ngưỡng"}</button>{vm.editing && <button className="button" type="button" onClick={vm.cancel} disabled={vm.mutation.pending}>Hủy</button>}</div>
    </form>
    <MutationNotice {...vm.mutation} />{vm.resource.status === "ready" && !vm.items.length && <p className="live-status empty">Bạn chưa có ngưỡng cảnh báo.</p>}<ul className="live-list">{vm.items.map(row => <li key={row.id}>
      <strong>{row.locationName} · {row.metricLabel} ≥ {row.value}</strong>
      <span>{row.is_active ? "Đang bật" : "Đang tắt"}</span>
      <div className="live-actions">
        <button type="button" className="button small" onClick={() => vm.edit(row)} disabled={vm.mutation.pending}>Sửa</button>
        <button type="button" className="button small" onClick={() => void vm.toggle(row)} disabled={vm.mutation.pending}>{row.is_active ? "Tạm tắt" : "Bật"}</button>
        <button type="button" className="button small" onClick={() => void vm.remove(row)} disabled={vm.mutation.pending}>Xóa</button>
      </div>
    </li>)}</ul>
  </div>;
}
function Notices({ scope }: { scope: string }) {
  const vm = useNotifications(scope);
  return <div className="soft-panel">
    <div className="panel-top">
      <h3>Thông báo của bạn</h3>
      <span className="pill">{vm.unread} CHƯA ĐỌC</span>
    </div>
    <ResourceNotice {...vm.resource} />
    <MutationNotice {...vm.mutation} />{vm.resource.status === "ready" && !vm.items.length && <p className="live-status empty">Bạn chưa có thông báo.</p>}<ul className="live-list">{vm.items.map(notice => <li key={notice.id}>
      <strong>{notice.title}</strong>
      <p>{notice.body}</p>
      <span className="data-note">{notice.time} · {notice.is_read ? "Đã đọc" : "Chưa đọc"}</span>{!notice.is_read && <div className="live-actions">
        <button className="button small" type="button" onClick={() => void vm.markRead(notice.id)} disabled={vm.mutation.pending}>Đánh dấu đã đọc</button>
      </div>}</li>)}</ul>
    <button className="button small" onClick={vm.resource.reload} type="button">Làm mới thông báo</button>
  </div>;
}
function AlertContent({ scope }: { scope: string }) {
  return <div className="live-account-grid">
    <Thresholds scope={scope} />
    <Notices scope={scope} />
  </div>;
}
export function LiveAlertPanel() { return <AccountGate>{scope => <AlertContent key={scope} scope={scope} />}</AccountGate>; }
function ProfileContent({ scope }: { scope: string }) {
  const vm = useProfile(scope);
  return <div className="soft-panel">
    <h2>Tài khoản của bạn.</h2>
    <p>{vm.email}</p>
    <ResourceNotice {...vm.resource} />{vm.resource.status === "ready" && <form className="live-form" onSubmit={event => { event.preventDefault(); void vm.save(); }}>
      <label className="live-field" htmlFor="display-name">Tên hiển thị<input id="display-name" value={vm.displayName} onChange={event => vm.setDraft(event.target.value)} autoComplete="nickname" disabled={vm.mutation.pending} />
      </label>
      <button type="submit" className="button primary" disabled={vm.mutation.pending}>{vm.mutation.pending ? "Đang lưu…" : "Lưu thay đổi"}</button>
    </form>}<MutationNotice {...vm.mutation} />{vm.signOutError && <p role="alert" className="live-status error">{vm.signOutError}</p>}<div className="live-actions">
      <LandingLink className="button" section="chapter-alert">Ngưỡng & thông báo</LandingLink>
      <button type="button" className="button" onClick={() => void vm.signOut()} disabled={vm.signingOut || vm.mutation.pending}>{vm.signingOut ? "Đang đăng xuất…" : "Đăng xuất"}</button>
    </div>
  </div>;
}
export function ProfilePanel() { return <AccountGate>{scope => <ProfileContent key={scope} scope={scope} />}</AccountGate>; }
