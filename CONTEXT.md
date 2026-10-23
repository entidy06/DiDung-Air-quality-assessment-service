# DiDung — context bàn giao cho AI agent

Cập nhật: **23/10/2026, Asia/Ho_Chi_Minh**. Đây là ảnh chụp trạng thái làm việc, không phải báo cáo đã triển khai. Đọc lại source và `git status` trước khi tiếp tục vì trạng thái có thể thay đổi sau thời điểm này.

## 1. Đọc theo thứ tự

1. [AGENTS.md](AGENTS.md): quy tắc bắt buộc của repo.
2. File này: yêu cầu người dùng, quyết định và công việc còn dở.
3. [design.md](design.md): hướng thiết kế và lưới đã làm trong phiên này. Có lịch sử bản cũ, một số đoạn chưa cập nhật theo thay đổi gần nhất; xem mục 7 của context.
4. [src/app/page.tsx](src/app/page.tsx), [button.tsx](src/components/ui/button.tsx): UI chính thức thực có.
5. [landing-preview.html](docs/design/landing-preview.html), [story-preview.css](docs/design/story-preview.css), [story-preview.js](docs/design/story-preview.js): bản review đang chỉnh.
6. [README.md](README.md), `docs/specs/`: phạm vi sản phẩm và spec backend. README có nội dung kế hoạch; không coi mọi chức năng được mô tả là đã chạy.

File context không thay thế AGENTS.md và không tự cấp quyền thay đổi kiến trúc/schema hoặc triển khai UI chưa duyệt.

## 2. Dự án và quy tắc quan trọng

- Workspace: `D:\Study\DiDung-Air-quality-assessment-service`; Windows, PowerShell, npm. Manifest yêu cầu Node `^22.13.0`.
- DiDung hỗ trợ quyết định khi ra ngoài tại TP.HCM bằng PM2.5/AQI và thời tiết. Nguy cơ ngập còn phụ thuộc phạm vi được duyệt/nguồn đã kiểm chứng.
- Stack đọc từ `package.json`: Next.js `16.4.2`, React `19.1.0`, TypeScript, Tailwind v4, shadcn/Radix, Zustand, GSAP, Lenis, Supabase Cloud; có dependency Mapbox/OGL. Package tồn tại không chứng minh tính năng đã triển khai. Đối chiếu manifest/lockfile khi cần version; không cài/nâng theo trí nhớ.
- **MVVM:** Model trong `src/lib` và API routes; View trong `src/app`/`src/components`; ViewModel trong stores/hooks. Không fetch nguồn ngoài/Supabase trực tiếp trong component View.
- **Nguồn chính thức:** trước khi viết code/cấu hình dùng thư viện/framework/dịch vụ, tra tài liệu chính thức; khi cài package lấy version qua registry. Ghi nguồn thực sự đã dùng.
- **Thay đổi lớn:** schema, auth, kiến trúc, nguồn dữ liệu, stack cần spec → người dùng approve → implement. Migration có version, không sửa dashboard rồi bỏ repo.
- **UI:** dựng bản vẽ/preview và được người dùng xác nhận trước khi sửa UI chạy thật. Người dùng hiện đang chỉnh preview, chưa có xác nhận áp dụng toàn bộ preview vào `src/`.
- **Test:** không tự viết test/test suite hoặc thêm file `*.test.*`, `*.spec.*`. Các kiểm tra thông thường là `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- Không đọc/in/commit secret; dùng Supabase project cloud hiện có, không dựng Supabase local. Không đổi API/Model chỉ vì đổi style.
- Commit nếu được yêu cầu: Conventional Commits; không `--no-verify`, không force-push nhánh chung. Phiên này chưa commit/push/deploy.
- Dọn file Windows: kiểm tra resolved absolute path nằm trong workspace, dùng `Remove-Item -LiteralPath` với danh sách file cụ thể; không xóa đệ quy thư mục nguồn theo phỏng đoán.

## 3. Yêu cầu người dùng đã chốt

Mục tiêu ban đầu: đọc folder **didung template**, tạo/cập nhật `design.md` trong service, đưa style/animation template sang service nhưng giữ mọi feature/tab/hành vi thật.

Các phản hồi tiếp theo:

1. Landing phải là **một câu chuyện**, không phải chuỗi section quảng bá tính năng: ngồi trong nhà → muốn ra ngoài → nhìn cửa sổ → băn khoăn không khí → kiểm tra DiDung → quyết định.
2. Người dùng cho phép tự tạo asset. Bộ ảnh hiện thực ban đầu bị từ chối.
3. Art direction hiện tại là **hoạt họa 2D đơn giản**: nhân vật mặt tròn, mắt chấm, ít chi tiết; nét bo mềm, màu kem/sage/xanh. Người dùng đã nói **“hình ảnh thì ổn rồi”** đối với bộ cartoon hiện tại. Giữ bộ này.
4. Người dùng yêu cầu **align theo lưới 12 cột**. Đã áp dụng vào preview và có overlay đối chiếu.
5. Yêu cầu công việc trước lúc xin context: **“đồng bộ những button, tab ở bên UI chính thức qua bên review và loại bỏ những file thừa”**. Đang làm dở, xem mục 7.
6. Yêu cầu mới nhất: tạo file context để agent khác tiếp tục trong repo. File này đáp ứng yêu cầu đó.

Nền kem, sans-serif lớn, UI phẳng theo template vẫn là hướng hiện tại. Các ghi chú Neumorphism trong AGENTS/CSS source là nền cũ; không vì vậy đổi ngược các artwork/layout đã được người dùng yêu cầu. Khi áp vào service cần đồng bộ hướng dẫn cũ trong phạm vi được duyệt.

## 4. UI chính thức thực tế — không suy diễn từ template

Tại lần đọc gần nhất, `src/app/page.tsx` chỉ có:

- Heading `DiDung`.
- Mô tả `Hỗ trợ quyết định khi ra ngoài tại TP. Hồ Chí Minh`.
- `<Button variant="primary">Bắt đầu</Button>`.
- `<Button>Tìm hiểu thêm</Button>`.

**Hai nút này chưa có handler hoặc route nghiệp vụ. Chưa có tab nào được render trong UI chính thức.** Không tự tạo tab bản đồ/lịch sử/tài khoản/thông báo rồi báo là đã đồng bộ từ source.

`button.tsx` có variant `default`, `primary`, `destructive`; size `default`, `sm`, `lg`; hỗ trợ `asChild`. UI hiện chỉ dùng hai nút nêu trên, không cần tự dựng showcase mọi variant.

`src/stores/ui-store.ts` có `sidebarOpen`/`toggleSidebar`, nhưng chưa có sidebar UI. `src/app/layout.tsx` giữ tiếng Việt, metadata, Geist/Geist Mono và LenisProvider. LenisProvider hiện dùng GSAP ticker; cần rà soát reduced motion khi thực sự tích hợp UI mới.

## 5. Backend đã thấy trong source

| Route | Dữ liệu / lưu ý |
| --- | --- |
| `/api/locations` | Danh sách active: id, name, slug, latitude, longitude |
| `/api/air-quality/current?locationId=…` | valid_at, pm2_5, european_aqi, us_aqi, source, fetched_at; `data_type: modeled` |
| `/api/weather/current?locationId=…` | precipitation, precipitation_probability, relative_humidity, wind_speed, wind_direction, uv_index, sunshine_duration, valid_at/source/fetched_at; hiện không trả nhiệt độ |
| `/api/advisories/current?locationId=…` | air_quality_level, summary, action, note, model, valid_at, created_at |
| `/api/sync/*` | Đồng bộ AQI mô hình, thời tiết, lời khuyên; không đổi vì restyle |

API có trong source không chứng minh Supabase/migration/data đang chạy. Phiên này chưa xác nhận trạng thái cloud.

`src/lib/air-quality.ts` hiện gom bốn mức và trả `moderate` khi AQI null. Không dùng fallback này để hiện “không khí tốt/ổn” khi thiếu dữ liệu trong UI mới; nếu cần sửa Model phải tách phạm vi rõ, không sửa lén như thay CSS.

## 6. Preview đang dùng

### Chạy

Từ root repo:

```powershell
node docs/design/serve-preview.mjs
```

Mở `http://127.0.0.1:4174/landing-preview.html` hoặc `/`. Server chỉ bind `127.0.0.1`, phục vụ `docs/design`, không cần cài package. Server từng được chạy trong phiên này; kiểm tra cổng trước khi khởi động thêm, không mặc định process còn sống. Có thể mở HTML trực tiếp để xem cơ bản.

### File cần giữ

- `docs/design/landing-preview.html`: HTML hiện tại, bản review duy nhất cần tiếp tục chỉnh.
- `docs/design/story-preview.css`: style/layout, hiện có CSS nền cũ + các override 12 cột; có thể gom lại khi dọn, phải giữ hành vi.
- `docs/design/story-preview.js`: scroll camera/crossfade, demo ba kết thúc. Không gọi API.
- `docs/design/serve-preview.mjs`: local server.
- `docs/design/assets/story-room-v3.png`: cartoon nhân vật ngồi trong nhà.
- `docs/design/assets/story-window-v3.png`: cartoon nhìn qua cửa sổ.
- `docs/design/assets/story-outside-v3.png`: cartoon bước qua cửa.
- `docs/design/assets/story-assets.md`: nguồn tạo bằng ImageGen tích hợp, đường dẫn và prompt cuối của ba asset cartoon. Phải giữ provenance/prompt của asset đang dùng.
- `design.md`: quy chuẩn và storyboard, cần cập nhật theo source sau đồng bộ/dọn.

### Story và tương tác

Một sân khấu sticky `100svh`, lời kể HTML cuộn phía trước; room → window → phone overlay → ending. Ảnh là trang trí, không chứa text/UI. Reduced motion/không JS có các cảnh tĩnh. Cuộn không thay đổi AQI.

Ba tình huống demo: tốt (42), xấu (176), thiếu dữ liệu (dấu gạch). Chỉ nhánh tốt hiện ảnh bước ra ngoài; hai nhánh còn lại quay về phòng. Các số là fixture có nhãn, không phải thông tin hiện tại hoặc kết luận an toàn cá nhân.

Các anchor: `#top`, `#explore`, `#check`, `#decision`, `#workspace`, `#method`. Giữ skip link, bàn phím và cuộn tự nhiên; không ép xem hết story.

### Lưới đã áp dụng

- Container max 1440px; desktop/tablet lề `clamp(24px, 5vw, 80px)`, mobile ≤700px lề 24px.
- `repeat(12, minmax(0, 1fr))`; gutter 24px desktop >1100px, 20px tablet 701–1100px, 8px mobile.
- Lời kể desktop cột 1–6; phone 9–11, tablet 8–12, mobile 3–10 ở hàng sau.
- Header, tiến trình, workspace, nguồn và footer dùng chung container/gutter. Ảnh nền vẫn tràn khung.
- Mở “Hiện lưới 12 cột để đối chiếu bố cục” trong panel duyệt, rồi cuộn xem overlay. Không đưa overlay/demo controls thành feature sản phẩm.

## 7. Công việc bị ngắt: đồng bộ button/tab và dọn file

### Đã sửa trước khi người dùng yêu cầu context

- Đã đối chiếu lại source, xác nhận chỉ hai nút và không có tab render.
- Header preview đã dùng nhãn đúng `Bắt đầu` / `Tìm hiểu thêm`, các class `service-button`, `service-button-primary`, `data-service-action`.
- Đã thay ba vùng công cụ giả định (`service-slots`) bằng `service-home`: tên/mô tả giống trang chính thức và hai CTA.
- Header `Bắt đầu` đến `#workspace`; CTA trong `service-home` đến `#check`; `Tìm hiểu thêm` đến `#method`. Đây là điều hướng để review, không phải handler nghiệp vụ được copy từ service.
- Có chú thích rõ source chưa có tab/handler; fixture và lưới là công cụ duyệt.
- CSS đã thêm kiểu primary/secondary phẳng, cao tối thiểu 44px; xóa các rule `service-slots` không còn dùng và thêm grid cho `service-home`.

### Chưa hoàn tất — bước tiếp theo

1. **Rà responsive các nút mới.** `.service-home > h3/p` hiện cột 1–7, `.service-actions` cột 9–12, hàng 1–2. Chưa thêm override mobile cho các selector mới; cần cho title/description/actions xuống đủ hàng, tránh chật. Header buttons có padding/font desktop nên cũng cần kiểm tra mobile.
2. Kiểm tra markup, anchor, keyboard/focus và tính nhất quán hai nút. Không báo có tab để đồng bộ nếu source chưa có.
3. Cập nhật `design.md`: bảng ba vùng công cụ 4–4–4 và lịch sử bản cũ đã lỗi thời so với `service-home` mới. Có thể rút thành tài liệu hiện trạng thay vì giữ mọi lịch sử hội thoại.
4. Dọn các bản preview/asset cũ theo danh sách bên dưới, sau khi quét tham chiếu. **Chưa xóa file nào trong tác vụ dọn này.** Không kết luận cleanup đã hoàn thành.
5. Sửa/xóa link trỏ tới file bị dọn trong `design.md`, `assets/README.md`, `story-assets.md` và cả file context này khi cập nhật trạng thái. Không bỏ log prompt của ba ảnh đang dùng.
6. Kiểm tra cú pháp JS/server, `git diff --check`, HTTP/local refs/anchors/ảnh. Không tự tạo test suite.
7. Bàn giao rõ phần nào đã hoàn thành, phần nào chưa được browser xác nhận. Chưa chuyển UI sang `src/` nếu chưa có duyệt phù hợp.

### Các file cũ có thể dọn sau khi kiểm tra tham chiếu

Đây là các bản/asset đã được tạo trong phiên để giữ lịch sử, hiện không phải entrypoint preview:

```text
docs/design/landing-preview-v1.html
docs/design/landing-preview-v2.html
docs/design/landing-preview-v3.html
docs/design/story-preview-v2.css
docs/design/story-preview-v3.css
docs/design/legacy-neumorphism.md
docs/design/assets/story-room-v2.png
docs/design/assets/story-window-v2.png
docs/design/assets/story-outside-v2.png
docs/design/assets/story-assets-v2.md
docs/design/assets/botanical.png
```

`docs/design/assets/README.md` hiện nói về botanical cũ; nên viết lại cho ba cartoon đang dùng hoặc bỏ nếu chỉ lặp `story-assets.md`.

**Không tự xóa:** `didung template/` (template nguồn), `design_new` (bản nháp có sẵn trước phiên), `.gitkeep`, source/API/spec/migration. Người dùng đã yêu cầu dọn file thừa, nhưng cần phân biệt bản dư do agent tạo với input/source người dùng còn cần.

Template nguồn có ở cả `D:\Study\didung template` và bản trong repo `didung template/`. Đã từng đối chiếu SHA256 HTML/CSS và thấy khớp. Thư mục ngoài repo không thuộc writable workspace; không sửa/xóa để dọn bản review.

## 8. Kiểm chứng đã có và giới hạn

- Trước thay đổi button gần nhất: HTML/CSS/JS và ba ảnh v3 trả HTTP 200; `node --check` JS/server và `git diff --check` đã qua.
- **Sau lần sửa button gần nhất chưa chạy lại kiểm tra.** Không dùng kết quả cũ để kết luận thay đổi mới đã đúng.
- Đã xem từng ảnh trong kết quả ImageGen. Chưa xem được toàn trang/interaction bằng browser: `cua.listBrowsers()` trả danh sách rỗng trong các lần kiểm tra trước.
- `npm run lint` từng lỗi không tìm thấy `eslint`; `npm run build` từng lỗi không tìm thấy `next`. Workspace thiếu dependency thực thi ở thời điểm đó. `npx tsc --noEmit` không có kết quả và đã được dừng, không được báo pass.
- Chưa cài package, chưa thêm test, chưa kiểm chứng cloud/API thật, chưa sửa `src/`, chưa deploy/commit/push. Nếu cần xác minh lại khả năng chạy, kiểm tra môi trường hiện tại trước.

## 9. Nguồn đã dùng trong phiên

Source repo và template là nguồn cho inventory/UI/API; không lấy feature demo template làm tính năng thật.

- [MDN — CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout), [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column), [repeat](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat), [minmax](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax).
- [MDN — position](https://developer.mozilla.org/en-US/docs/Web/CSS/position), [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame), [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect), [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).
- [MDN — reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), [scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior).
- [MDN — button](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button), [anchor](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a): giữ semantics điều khiển/hyperlink đúng mục đích trong preview.
- Server local dựa trên `serve.mjs` của template, đã tra docs Node chính thức: [HTTP](https://nodejs.org/api/http.html), [fs](https://nodejs.org/api/fs.html), [path](https://nodejs.org/api/path.html), [URL](https://nodejs.org/api/url.html).

Không coi danh sách nguồn này là xác minh vĩnh viễn cho API hoặc thư viện mới. Khi tiếp tục, đọc đúng tài liệu chính thức cho thay đổi sẽ làm.

## 10. Ghi chú Git và cập nhật context

Working tree đang có `design.md` modified; phần lớn preview/assets là **untracked**. `design_new` và `didung template/` cũng untracked từ trước, không phải file có thể bỏ tự động. Không `git clean`, không reset/revert working tree để bắt đầu lại.

Sau mỗi bước lớn, cập nhật context theo trạng thái mới: cái gì đã xong, file nào thực sự đã dọn, kiểm tra nào đã chạy và còn gì chưa xác minh. Không giữ checklist “đã hoàn thành” khi công việc chỉ mới được đề xuất.
