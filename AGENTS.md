# AGENTS.md

Quy tắc **bắt buộc** cho mọi AI agent làm việc trong repo này. Vi phạm bất kỳ rule nào = công việc không hợp lệ.

## 1. Kiến thức của agent mặc định là SAI

- Mọi thứ agent "đã biết" (API, cú pháp, version, flag CLI, hành vi thư viện) đều coi là **chưa được xác nhận**.
- Trước khi viết code/cấu hình dùng thư viện, framework hay dịch vụ, **phải tra và xác nhận** từ nguồn chính thống trên internet: tài liệu chính thức, changelog/release notes, repo GitHub chính thức, npm registry.
- Không dùng blog/bài tổng hợp/câu trả lời không rõ nguồn làm căn cứ duy nhất.
- Khi báo cáo, ghi rõ nguồn đã dùng. Nếu không truy cập được nguồn, **nói rõ là chưa xác nhận được**, không đoán.
- Version cài đặt phải lấy từ registry (`npm view <pkg> version`), không lấy theo trí nhớ.

## 2. Thông tin repo

**DiDung** — ứng dụng web hỗ trợ quyết định khi ra ngoài tại TP. Hồ Chí Minh (PM2.5/AQI, thời tiết, và nguy cơ ngập khi nguồn dữ liệu được kiểm chứng). Đồ án môn Introduction to Software Engineering (HCMUS). Phạm vi và trạng thái xem [README.md](./README.md).

| Thành phần | Công nghệ | Version (xem `package.json`) |
| --- | --- | --- |
| Framework | Next.js (App Router, Turbopack) | 16.4.2 |
| UI runtime | React | 19.1.0 |
| Ngôn ngữ | TypeScript | ^5 |
| Lint | ESLint + `eslint-config-next` (flat config, không dùng `FlatCompat`) | ^10.13.0 / 16.4.2 |
| Styling | Tailwind CSS v4 + `tw-animate-css` | ^4 |
| UI components | shadcn/ui (Radix, cva, lucide-react) | `components.json`, style `new-york` |
| Database / Auth | Supabase Cloud (PostgreSQL) — `@supabase/supabase-js`, `@supabase/ssr` | ^2.118.0 / ^0.12.7 |
| State | Zustand | ^5.0.16 |
| Animation | GSAP + `@gsap/react` | ^3.15.0 |
| Smooth scroll | Lenis | ^1.3.27 |
| WebGL | OGL | ^1.0.11 |
| Bản đồ | Mapbox GL JS | ^3.33.0 |
| Hosting dự kiến | Vercel + Supabase Cloud | — |
| CI | GitHub Actions (`.github/workflows/ci.yml`: typecheck + lint + build) | — |
| Scheduler | Supabase `pg_cron` + `pg_net` (trigger-only, gọi `src/app/api/sync/*`) | xem `supabase/migrations/` |
| LLM gateway | 9Router self-host (`router.studev.net`) — sinh lời khuyên AQI (`src/lib/ninerouter.ts`), model `ag/gemini-3.8-flash-low` | server-side only, `NINEROUTER_API_KEY` |

Môi trường: Node 22, npm. Supabase **dùng project cloud có sẵn**, không chạy local. Biến môi trường: xem `.env.example`; **không commit secret**.

Cấu trúc chính:

```text
src/app/                 # routes (App Router)
src/app/api/             # API routes (tầng Model) — sync/*, jobs/*, locations, air-quality/*, weather/*, advisories/*, me/*, map/*
src/components/ui/       # shadcn/ui components (neumorphism theo design.md)
src/components/providers/# provider client (Lenis, ...)
src/lib/                 # utils, supabase clients (client.ts/server.ts/admin.ts), open-meteo.ts
src/stores/              # Zustand stores
supabase/migrations/     # migration DB có version (Supabase CLI), xem docs/specs/2026-10-22-backend-schema.md
docs/  pa/               # tài liệu đồ án
design.md                # palette + quy chuẩn UI
```

Lệnh: `npm run dev` · `npm run build` · `npm run lint` · `npx tsc --noEmit`.

Khi nâng/đổi version hoặc thêm thư viện: **cập nhật bảng trên trong cùng commit**.

## 3. Architecture: MVVM

**MVVM là kiến trúc chính thức của dự án.** Ba lớp:

| Lớp | Vai trò | Vị trí trong repo |
| --- | --- | --- |
| **Model** | Dữ liệu domain, business logic, truy cập nguồn dữ liệu (Supabase, OpenAQ, Open-Meteo), tính toán dự báo/ngưỡng cảnh báo | `src/lib/` (supabase clients, data access, domain logic), Next.js API routes (`src/app/api/`) |
| **View** | UI thuần, **không chứa business logic, không tự fetch/transform data** | `src/app/**/page.tsx`, `src/components/` (Server/Client Components) |
| **ViewModel** | Cầu nối Model ↔ View: giữ state, gọi Model, expose dữ liệu/hành động đã xử lý cho View | `src/stores/` (Zustand) + custom hooks `src/hooks/` |

**Rule bắt buộc:** Component trong `src/app` / `src/components` không gọi trực tiếp `@supabase/supabase-js` hay `fetch` nguồn ngoài; phải qua hook/store ở `src/stores` hoặc `src/hooks`. View chỉ nhận props/state đã sẵn sàng hiển thị.

Thêm thư mục `src/hooks/` khi tạo custom hook đóng vai trò ViewModel; không đặt logic nghiệp vụ trong hook nếu hook đó chỉ nên là tiện ích thuần UI — ranh giới Model/ViewModel phải rõ.

## 4. Thay đổi lớn / schema phải qua Spec-Driven và được duyệt

- Thay đổi lớn gồm: schema DB (bảng, cột, index, RLS, function, cron), kiến trúc, auth, tích hợp nguồn dữ liệu ngoài, thay đổi stack.
- Quy trình: **viết spec → xin approve → mới implement**. Không code trước khi có approve rõ ràng của người dùng.
- Spec đặt ở `docs/specs/<yyyy-mm-dd>-<slug>.md`, tối thiểu gồm: bối cảnh/mục tiêu, phạm vi và ngoài phạm vi, thiết kế (với schema: DDL, quan hệ, RLS, migration, rollback), tác động, rủi ro, câu hỏi mở.
- Implement phải khớp spec đã duyệt. Cần lệch spec → cập nhật spec và xin duyệt lại.
- Mọi thay đổi schema phải qua migration có version; không sửa tay trên dashboard Supabase rồi bỏ qua repo.

## 5. UI: vẽ trước, làm đúng như đã vẽ

- Với mọi thay đổi có UI: **phải vẽ trước** (wireframe/mockup — Figma, ảnh, hoặc HTML preview) và được người dùng xác nhận **trước khi** sửa code.
- Bản vẽ phải tuân theo [design.md](./design.md) (palette + Neumorphism).
- Code UI phải **khớp chính xác** bản vẽ: bố cục, màu, khoảng cách, trạng thái. Không tự ý thêm/bớt/đổi.
- Muốn đổi so với bản vẽ → vẽ lại, xin duyệt lại.

## 6. Commit convention

Dùng [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```text
<type>(<scope>): <mô tả ngắn, thể mệnh lệnh>

[body: vì sao thay đổi]

[footer: BREAKING CHANGE / refs]
```

- `type`: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Mỗi commit một thay đổi logic; không gộp việc không liên quan.
- Ví dụ: `feat(map): add Mapbox AQI layer`, `docs: add AGENTS.md`.
- Không `--no-verify`, không force-push lên nhánh dùng chung.

## 7. Test: không tự ý viết

- **Không** tự viết test (kể cả file `*.test.*`, `*.spec.*`). Chỉ viết khi người dùng yêu cầu, hoặc agent **đề xuất và được duyệt**.
- Khi đề xuất: trình bày **đầy đủ kịch bản test** (phạm vi, test case, dữ liệu, kết quả mong đợi, công cụ) và chờ duyệt, rồi mới viết và chạy.
- **Cấm** tạo file test riêng lẻ cho từng tính năng vừa viết. Test được thiết kế thành bộ kịch bản tổng thể, không theo kiểu "viết xong tính năng nào thêm một file test cho tính năng đó".
- Kiểm tra thông thường sau khi code: `npx tsc --noEmit`, `npm run lint`, `npm run build`.
