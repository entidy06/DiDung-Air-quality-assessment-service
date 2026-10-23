# DiDung — Design system và kế hoạch chuyển UI từ template

Ngày đối chiếu mã nguồn: 23/10/2026. Trạng thái: **đề xuất chờ duyệt bản vẽ**. Phạm vi bàn giao: tài liệu thiết kế và HTML preview tách biệt; chưa sửa UI chạy thật, API, database hay template nguồn.

**Bản 03 — hoạt họa 2D đơn giản:** theo phản hồi mới, thay toàn bộ cảnh hiện thực bằng nhân vật cartoon mặt tròn, mắt chấm, nét viền bo mềm và các mảng màu ít chi tiết. Giữ câu chuyện từ ngồi trong nhà → mong muốn ra ngoài → băn khoăn bên cửa sổ → kiểm tra cùng DiDung → tự quyết định. Bản 01 và 02 được giữ để tham khảo; hình hoạt họa bản 03 tiếp tục được dùng trong bản 04.

**Bản 04 — căn lưới 12 cột:** hình hoạt họa bản 03 đã được người dùng xác nhận phù hợp. Chỉ cập nhật layout: mọi vùng nội dung dùng chung lề/container, 12 cột và gutter; giữ ảnh, câu chuyện và hành vi. Đây là bản preview đề nghị duyệt hiện tại. Bản 03 được lưu ở `docs/design/landing-preview-v3.html` với CSS riêng.

Bản xem trước: [landing-preview.html](docs/design/landing-preview.html). Bản quy chuẩn cũ được giữ ở [legacy-neumorphism.md](docs/design/legacy-neumorphism.md). Tài liệu này được đối chiếu từ bản nháp `design_new` có sẵn trong workspace, không sửa bản nháp gốc.

## 1. Mục tiêu và thứ tự ưu tiên

Đưa ngôn ngữ thị giác và animation của `D:\Study\didung template` vào `D:\Study\DiDung-Air-quality-assessment-service`, giữ nguyên năng lực và hành vi của service. Trang đầu là cảnh một người ngồi trong nhà, phát sinh mong muốn ra ngoài, kiểm tra không khí rồi tự quyết định; người dùng bấm **“Lướt xuống, cùng mình ra ngoài ↓”** để đi vào câu chuyện và các công cụ bên dưới. Cuộn bằng chuột, cảm ứng và bàn phím vẫn hoạt động bình thường.

Ưu tiên: tính đúng của dữ liệu → giữ tính năng/tab/route → khả năng sử dụng → style → animation. Chuyển động không được quyết định giá trị AQI, nội dung cảnh báo hay khả năng truy cập công cụ.

Tài liệu này thay thế định hướng **Neumorphism toàn site** trong bản `design.md` trước bằng định hướng editorial/botanical của template, theo yêu cầu mới của người dùng. Các đoạn nhắc Neumorphism trong `AGENTS.md`, comment CSS và component hiện tại là hướng dẫn cũ cần đồng bộ khi triển khai. Những quy tắc còn lại của repo, đặc biệt MVVM và bước duyệt mockup trước khi sửa UI, vẫn áp dụng.

## 2. Nguồn đã đọc và hiện trạng thực tế

### Template

- `dist/index.html`: hero; tìm địa điểm; điều hướng Hiện tại / Diễn biến / Quanh bạn; popup cảnh báo; các section nồng độ, lời khuyên, lịch sử/dự báo, sơ đồ và giải thích nguồn.
- `dist/styles.css`: nền vellum, sans-serif cỡ lớn, đường kẻ mảnh, bố cục phẳng; cảnh trời/cây đổi theo AQI; responsive; reduced motion; cây đung đưa chu kỳ 3 giây.
- `dist/app.js`, `dist/model.js`: tương tác DOM và fixture mô phỏng, sáu mức AQI, địa điểm mẫu, biểu đồ, cảnh báo localStorage.
- `README.md`, `ASSETS.md`: giới hạn demo và nguồn gốc ảnh cây `dist/assets/botanical.png` (PNG RGBA 1024 × 1536, tạo bằng ImageGen).
- Lượt yêu cầu này không có ảnh đính kèm truy cập được. Cảnh mở đầu lấy hero và ảnh botanical của template làm tham chiếu; không khẳng định đã đối chiếu ảnh “như ở trên”.

### Service

| Nguồn code | Đã có trong mã nguồn | Yêu cầu giữ khi đổi UI |
| --- | --- | --- |
| `src/app/page.tsx` | Một trang khởi đầu DiDung, hai nút “Bắt đầu”, “Tìm hiểu thêm” | Giữ ý định hai hành động: bắt đầu dùng công cụ và tìm hiểu; hiện chưa có handler nghiệp vụ để suy diễn thêm |
| `src/app/layout.tsx` | Metadata DiDung, tiếng Việt, Geist/Geist Mono, LenisProvider | Giữ tên sản phẩm, ngôn ngữ và cấu trúc provider |
| `src/app/api/locations/route.ts` | Danh sách địa điểm active | Dùng địa điểm thật từ service, giữ ID/slug/tọa độ |
| `src/app/api/air-quality/current/route.ts` | `valid_at`, `pm2_5`, `european_aqi`, `us_aqi`, `source`, `fetched_at`, `data_type: modeled` | Giữ nguồn, chuẩn chỉ số và nhãn dữ liệu mô hình |
| `src/app/api/weather/current/route.ts` | Mưa, xác suất mưa, ẩm, gió/hướng gió, UV, thời gian nắng, nguồn/thời gian | Giữ các trường hiện có; không thay bằng thời tiết demo |
| `src/app/api/advisories/current/route.ts` | `air_quality_level`, `summary`, `action`, `note`, `model`, thời gian | Giữ lời khuyên từ service và trạng thái thiếu/lỗi riêng |
| `src/app/api/sync/*` | Route đồng bộ AQI mô hình, thời tiết, lời khuyên | Không thay đổi cơ chế sync vì đổi giao diện |
| `src/stores/ui-store.ts` | State `sidebarOpen` và `toggleSidebar` | Không xóa state; hiện chưa có sidebar UI hoàn chỉnh |
| `src/components/ui/button.tsx`, `src/app/globals.css` | Button và token Soft UI | Giữ API props/variant; thay biểu hiện thị giác khi triển khai |

**Chưa thấy tab dashboard, trang bản đồ, lịch sử, dự báo, thông báo hay tài khoản hoàn chỉnh trong cây route hiện tại.** Có dependency Mapbox/GSAP không đồng nghĩa đã có tính năng. README mô tả nhiều chức năng dự kiến và có thể chậm hơn code API; dùng code để xác định phần đã triển khai, dùng yêu cầu được duyệt để xác định phạm vi sản phẩm.

Trước khi triển khai phải đối chiếu lại nhánh/working tree lúc đó: lập danh sách mọi tab, route, action và quyền truy cập; mọi mục mới xuất hiện đều phải giữ. Không lấy ba link của template làm danh sách thay thế navigation của service.

## 3. Hướng nghệ thuật được chọn

**Hoạt họa 2D đơn giản + Swiss / International**, bố cục phẳng và scroll storytelling theo chiều dọc. Cảnh kể chuyện dùng hình khối lớn, nét viền charcoal mềm, nhân vật ít chi tiết, màu kem–sage–xanh của template. Không dùng ảnh thật, chất liệu photorealistic, nét cọ hiện thực hoặc render 3D. Organic / Nature còn thể hiện ở palette và cây được cách điệu.

| Nhóm style người dùng đưa | Cách áp dụng |
| --- | --- |
| Swiss / International | Lưới rõ, chữ sans lớn, thứ bậc tốt, số liệu thẳng hàng |
| Flat Design | Bề mặt liền nền, đường phân cách 1px, tránh thẻ nổi |
| Hoạt họa 2D / Nature | Người, cây, cửa sổ, nhà cửa giản lược thành khối bo mềm; khuôn mặt mắt chấm, không dựng anatomy hay texture thật |
| Chuyển động theo cuộn | Camera tiến nhẹ, chuyển góc nhìn phòng → cửa sổ → cửa ra phố; đọc dữ liệu trong một cảnh yên |
| Bento Grid | Chỉ dùng cách chia vùng thông tin nếu công cụ cần; không biến mọi số liệu thành hộp bo tròn |
| Material Design | Mượn tính nhất quán của phản hồi tương tác; không đưa thêm hệ màu/bóng riêng |
| Các style còn lại | Là tập tham khảo, không trộn mặc định. Neon, glitch, terminal, pixel, luxury dark, collage và gamification không thuộc hướng hiện tại |

Kết quả cần giống một trang editorial về môi trường: rộng, thoáng, có cảm xúc nhưng đọc số liệu nhanh. Không dùng neumorphism, glassmorphism, bóng kép, nền dashboard dày đặc hoặc cursor tùy biến.

## 4. Palette và token

Các giá trị dưới lấy từ CSS/model của template; đây là mục tiêu thiết kế, chưa được áp vào CSS service.

| Token mục tiêu | Giá trị | Vai trò |
| --- | --- | --- |
| `--paper` | `#F4E6CD` | Nền chính |
| `--ink` | `#1E211E` | Chữ và icon chính |
| `--linen` | `#EDDDC3` | Hover, vùng phụ |
| `--muted` | `#5E6055` | Metadata, chú thích |
| `--rule` | `#9A9985` | Đường phân cách |
| `--accent` | `#397447` | Hành động chính, trạng thái tốt |
| `--sky-top` / `--sky-mid` | `#B5D1DB` / `#DCE4D2` | Cảnh nền tốt, chuyển về paper ở dưới |

Màu trạng thái theo template: tốt `#397447`; trung bình `#A37C15`; nhóm nhạy cảm `#AC5A26`; có hại `#B03933`; rất có hại `#805182`; nguy hại `#7E3045`. Dùng kèm số và nhãn, không dùng màu một mình. Chữ body vẫn dùng ink; màu nhấn không tự động phù hợp cho chữ nhỏ.

Ánh xạ token semantic mục tiêu: background/card/input → paper; foreground/card-foreground → ink; muted surface → linen; muted-foreground → muted; border → rule; primary/ring → accent; destructive → màu có hại. Kiểm tra tương phản thực tế trước khi chọn màu foreground trên button có nền đặc.

Các token cũ cream/brown/olive/forest/sage/butter/orange/crimson và `shadow-neu*` phải được rà soát toàn bộ nơi dùng khi chuyển đổi. Giữ alias tương thích trong giai đoạn chuyển nếu cần; không xóa token khiến UI hiện có hỏng. Không áp cả palette cũ và mới xen kẽ trong bản hoàn tất.

## 5. Typography, khoảng cách và component

- Template dùng Arial/Helvetica Neue với chữ sans, weight khoảng 500 cho heading và tracking âm. Service hiện dùng Geist: giữ font hiện có ở giai đoạn đầu, điều chỉnh tỉ lệ/khoảng cách; nếu cần khớp template hơn, dùng system sans thay vì thêm font có bản quyền.
- Heading hero desktop mục tiêu 44–88px, line-height 1.04–1.1; mobile khoảng 42–60px. Cho phép giảm theo chiều cao viewport để CTA còn nhìn thấy. Không ép chiều rộng làm biến dạng chữ hoặc mất dấu tiếng Việt.
- Số AQI desktop khoảng 112–160px; mobile 80–108px; số có độ rộng ổn định. Body 16–18px; nội dung tương tác mobile tối thiểu 16px; metadata 12–13px và đủ tương phản.
- Layout bản 04 dùng lưới 12 cột quy định dưới đây, thay các khoảng cách ngang theo phần trăm rời rạc. Section spacing 72–96px desktop / 40–56px mobile.
- Mặc định góc vuông hoặc bo nhẹ 0–4px. Button/link dùng underline, mũi tên hoặc viền 1px. Không tạo shadow nổi/lõm; điện thoại minh họa cũng dùng viền phẳng như §6. Dropdown/dialog có nền đặc, viền rõ và focus ring.
- Tab đang chọn dùng underline và nhãn active, giữ semantic/keyboard hiện có; không đổi tab nghiệp vụ thành carousel kể chuyện.
- Input tìm kiếm có nhãn truy cập được, viền dưới, kết quả bàn phím và trạng thái loading/empty/error. Không sao chép dropdown chỉ dựa vào hover.
- Biểu đồ/bản đồ giữ tương tác, chú giải, bảng thay thế và đơn vị nếu đã có; không dùng ảnh hoặc sơ đồ demo thay cho công cụ thật.

### Lưới 12 cột — bản 04

- Container nội dung tối đa **1440px**, căn giữa. Lề desktop/tablet `clamp(24px, 5vw, 80px)`; trên màn hình rộng tăng lề để giữ giới hạn container. Mobile ≤700px lề **24px**.
- Mỗi vùng dùng `repeat(12, minmax(0, 1fr))`; gutter **24px** trên desktop >1100px, **20px** trên tablet 701–1100px, **8px** trên mobile ≤700px.
- Header, từng nhịp kể chuyện, thanh tiến trình, phần công cụ, nguồn và footer cùng các đường cột. Grid lồng trong heading/công cụ dùng đủ chiều rộng container và cùng gutter để đường cột khớp nhau.
- Ảnh hoạt họa là bối cảnh tràn khung, không crop/chỉnh asset để ép vào cột. Nội dung HTML mới tuân lưới; điện thoại bỏ xoay và định vị phần trăm, đặt trực tiếp vào grid.

| Vùng | Desktop: cột chiếm (đếm từ 1 đến 12) | Tablet | Mobile |
| --- | --- | --- | --- |
| Logo / caption / navigation | 1–2 / 3–5 / 8–12 | Ẩn caption ở ≤1000px như trước | Logo 1–3, nav 5–12 |
| Lời kể và CTA | 1–6 | 1–6 | 1–12 |
| Điện thoại | 9–11 | 8–12 | 3–10, hàng dưới lời kể |
| Heading công cụ / mô tả phụ | 1–7 / 9–12 | 1–8 / 9–12 | Mỗi phần 1–12, hai hàng |
| Ba vùng công cụ | 1–4 / 5–8 / 9–12 | Giữ ba vùng | Mỗi vùng 1–12 |
| Chú thích / panel duyệt | 1–8 / 1–9 | Panel 1–12 | Cả hai 1–12 |
| Nguồn: tiêu đề / nội dung | 1–5 / 7–12 | Giữ hai vùng | Mỗi phần 1–12 |
| Footer: logo / caption / link | 1–2 / 4–6 / 10–12 | Giữ đường cột | Logo 1–4, caption 5–12; link hàng sau 1–12 |

Trong phần “Dành riêng cho việc duyệt bản vẽ”, mở **“Hiện lưới 12 cột để đối chiếu bố cục”** rồi cuộn để xem overlay. Overlay dùng đúng token/grid của nội dung, không chặn click. Đóng mục để trở lại preview bình thường. Đây là công cụ duyệt, không phải tính năng sản phẩm.

Nguồn CSS chính thức đã xác minh: [MDN — Grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout), [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column), [repeat](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat), [minmax](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax).

## 6. Landing page: câu chuyện trước cánh cửa — bản 04 (hình hoạt họa bản 03)

**Hướng mới theo phản hồi người dùng:** kể chuyện một người ngồi trong nhà, muốn ra ngoài, băn khoăn về không khí, tìm hiểu cùng DiDung, rồi tự quyết định. Không dùng chuỗi section giới thiệu feature làm cốt truyện. Bản 01 được lưu riêng ở `docs/design/landing-preview-v1.html`, không còn là bản đề nghị duyệt.

### Nhân vật và không gian

Một nhân vật hoạt họa trẻ ở Sài Gòn: mặt tròn, mắt chấm, tóc ngắn thành mảng tối, áo xanh sage, quần kem, dáng mềm và ít chi tiết. Góc nghiêng để đọc được biểu cảm muốn ra ngoài, đồng nhất silhouette và trang phục giữa cảnh ngồi và cảnh bước qua cửa. Cây vài lá bầu dục, nhà vài khối/mái; cửa sổ và nội thất ít đường nét. Không mô tả chất liệu vải/da, không ánh sáng hay texture ảnh thật. Địa điểm là hư cấu, không phải ảnh quan trắc.

Assets ImageGen mới: `story-room-v3.png` (ở nhà), `story-window-v3.png` (tiến đến cửa sổ), `story-outside-v3.png` (bước ra phố). File và prompt đầy đủ ở `docs/design/assets/story-assets.md`. Chữ, dữ liệu và UI render bằng HTML. Đây là frame raster theo phong cách hoạt họa; chuyển động hiện tại là camera/crossfade theo cuộn, chưa phải animation nhân vật theo từng khung hình. Bản sinh có biến thiên sắc độ nhẹ, không phải vector màu phẳng tuyệt đối.

### Cảnh đầu

Lần vào mới, viewport đầu chỉ là phòng có người đang ngồi và câu mở: **“Ở nhà một lúc. Muốn ra ngoài một chút.”** Header nhỏ chứa DiDung, “Bắt đầu”, “Tìm hiểu thêm”; CTA **“Lướt xuống, cùng mình ra ngoài ↓”** đến `#explore`. Không đưa AQI, bảng feature hoặc dashboard lên trước khi có lý do kiểm tra trong câu chuyện.

Desktop: ảnh phủ khung, nhân vật/cửa sổ phía phải; chữ nằm trên vùng tường kem phía trái có lớp wash hỗ trợ tương phản. Heading 44–88px theo viewport, CTA và nhãn preview trong cảnh đầu. Mobile: chữ ở phần trên, ảnh chủ thể về phần dưới, không giấu nội dung để vừa chiều cao cố định. Với màn hình thấp/zoom, cho phép cảnh đầu dài hơn viewport để không cắt chữ.

### Storyboard 5 nhịp nối tiếp

| Nhịp | Lời kể | Hình ảnh / chuyển cảnh | Vai trò trong câu chuyện |
| --- | --- | --- | --- |
| 0 — Ở nhà | “Tách trà đã vơi. Trang sách vẫn mở. Còn mình, chợt muốn đi đâu đó.” | Người ngồi cạnh cửa sổ, khung rộng, cây và nắng mềm | Giới thiệu nhân vật và trạng thái ban đầu, chưa có dữ liệu |
| 1 — Muốn ra ngoài (`#explore`) | “Đi bộ một vòng. Ghé quán quen. Hay chỉ là hít thở.” | Camera tiến rất nhẹ vào cùng phòng theo cuộn | Nảy sinh mong muốn, cùng một không gian, không nhảy sang quảng cáo tính năng |
| 2 — Băn khoăn | “Trời trông thật đẹp. Nhưng không khí thì sao?” | Crossfade sang góc nhìn sát cửa sổ, vẫn cùng ánh sáng | Tạo câu hỏi cần giải đáp; nắng đẹp không chứng minh không khí tốt |
| 3 — Tìm hiểu (`#check`) | “Để DiDung nhìn cùng mình.” | Giữ góc cửa sổ, điện thoại xuất hiện ở tiền cảnh, đọc địa điểm/AQI/nguồn/thời gian | Sản phẩm xuất hiện để giúp nhân vật giải quyết câu hỏi đã hình thành |
| 4 — Quyết định (`#decision`) | Câu kết thay đổi theo tình huống | Chỉ nhánh tốt chuyển sang người bước qua cửa; hai nhánh còn lại trở về phòng | Câu chuyện có kết quả, không tự động kết thúc bằng việc ra ngoài |

Sau kết thúc, CTA **“Còn nơi bạn sắp đến thì sao?”** chuyển đến công cụ tại `#workspace`. Câu chuyện chuyển từ nhân vật sang người dùng; khu vực công cụ có layout ổn định và giữ toàn bộ tab/route/action thực có. Giải thích chuẩn/nguồn ở `#method`, không chen vào cao trào kể chuyện.

### Ba kết thúc, không có kết luận an toàn mặc định

| Tình huống demo | Lời kết | Cảnh kết |
| --- | --- | --- |
| Tốt, ví dụ AQI 42 | “Hôm nay, mình chọn bước ra ngoài.” | Người bước qua cửa ra phố; đây là lựa chọn trong câu chuyện minh họa |
| Xấu, ví dụ AQI 176 | “Hôm nay, mình chọn một kế hoạch khác.” | Trở về cảnh phòng, chuyến đi bộ được để sau |
| Thiếu dữ liệu | “Chưa đủ rõ, mình chưa quyết định vội.” | Ở lại phòng, chờ cập nhật/kiểm tra nguồn; không hiện trạng thái tốt |

Ba nút chọn tình huống nằm trong khu vực **duyệt preview**, dưới câu chuyện, không phải nghiệp vụ sản phẩm. Nhãn dữ liệu mô phỏng nằm ngay trên điện thoại. Nhánh tốt không phải bảo đảm an toàn cá nhân; khi tích hợp, lời khuyên và trạng thái phải lấy từ service, không tạo logic khuyến nghị chỉ bằng một ngưỡng UI. Không tự thêm câu hỏi sức khỏe, auth, dữ liệu cá nhân hoặc thay đổi Model/schema.

### Cơ chế cuộn

Bản 03 dùng một sân khấu hoạt họa sticky `100svh` xuyên suốt 5 nhịp; nội dung lời kể cuộn tự nhiên phía trước. Khi tiêu điểm viewport sang nhịp mới, ảnh đổi góc bằng crossfade; tiến trình chỉ thể hiện vị trí câu chuyện. Chỉ nhịp 0–1 có zoom nhẹ tiến về cửa sổ. Nhịp 3 giữ cảnh đủ yên để đọc dữ liệu. Điện thoại dùng góc bo, viền charcoal và không có bóng đổ, phù hợp nét hoạt họa và UI phẳng.

Không chặn wheel/touch/keyboard, không giữ người dùng bằng scroll hijacking, không scroll snap bắt buộc. Bỏ qua câu chuyện bằng “Bắt đầu”/skip link bất cứ lúc nào. Hash/Back/Forward giữ đích, không ép về cảnh đầu. AQI không tăng/giảm theo cuộn; thứ thay đổi là thông tin nhân vật nhìn thấy.

Mobile giữ hình nền liên tục nhưng giảm zoom; đoạn đọc điện thoại được phép cao hơn màn hình. Reduced motion hoặc JavaScript không chạy: thay sticky/crossfade/zoom bằng các cảnh tĩnh nối tiếp, lời kể và anchor vẫn đủ nghĩa. Nội dung thật luôn tồn tại trong document, không chỉ có trong canvas hoặc ảnh.


## 7. Motion specification

Các con số dưới là mục tiêu thiết kế, không phải hướng dẫn API đã được xác minh.

| Chuyển động | Quy tắc |
| --- | --- |
| Hover/focus | 150–200ms; đổi underline/màu; không nhảy layout |
| Lời kể | Cuộn tự nhiên cùng document, không giấu đoạn trước khi animation sẵn sàng |
| Nút cuộn | Cuộn đến đầu `#explore` với offset header; focus chuyển hợp lý đến tiêu đề đích |
| Sân khấu | Một khung ảnh sticky xuyên 5 nhịp; nội dung chạy tự nhiên; reduced motion dùng cảnh tĩnh |
| Chuyển góc | Crossfade phòng → cửa sổ → ngưỡng cửa khoảng 800ms; đổi ngược khi cuộn lên |
| Camera | Scale ảnh phòng khoảng 1.025–1.075 theo tiến trình; mobile tắt scale, không làm chuyển dữ liệu |
| Cây | Là chi tiết trong artwork, không thêm sway lặp trên ảnh cả phòng |
| Đổi mức AQI | Chuyển sắc/độ sáng cảnh khoảng 800–1400ms; số và nhãn cập nhật ngay cùng dữ liệu, không chờ animation |
| Khi đứng yên | Không chạy RAF vô hạn; chỉ lên lịch một frame khi scroll/resize/pageshow/đổi tình huống |
| Reduced motion | Tắt sway/parallax/pin/reveal dịch chuyển/smooth scroll; mọi nội dung đọc được ngay, điều hướng cuộn tức thời |

Tách wrapper cảnh nhận opacity và ảnh con nhận camera scale, tránh hai animation ghi đè transform. Bản 02 không nghiêng hoặc làm héo cả ảnh phòng theo AQI. Chỉ một bên sở hữu smooth scrolling; không chồng native smooth scroll và Lenis. LenisProvider hiện có cần được rà soát cho reduced motion trước khi tái sử dụng.

Progress của câu chuyện chỉ thể hiện vị trí đọc, không biểu diễn AQI. Cuộn không tự đổi dữ liệu môi trường từ tốt sang xấu. Scene phải dựa trên dữ liệu service hợp lệ; trời nắng/mưa không được dùng suy ra chất lượng không khí.

## 8. Chuyển từ template sang dữ liệu service

| Thành phần template | Cách tích hợp vào service |
| --- | --- |
| AQI trên điện thoại ở nhịp 3 và fixture sáu mức | Bỏ fixture trong luồng thật; bind `us_aqi` và thời gian/nguồn từ API qua ViewModel; không đẩy dữ liệu lên cảnh ở nhà trước khi câu chuyện đặt câu hỏi |
| Năm địa điểm mẫu | Thay bằng `/api/locations`; giữ ID thật xuyên toàn bộ request |
| PM2.5 + PM10/O₃/NO₂/CO/SO₂ demo | Hiện PM2.5 từ API; các chất khác chỉ hiện khi có field/nguồn thật, không dựng số |
| “29° Nắng nhẹ” | API weather hiện chưa trả nhiệt độ; không hiển thị 29° hoặc suy nhiệt độ từ trường khác. Dùng mưa/gió/ẩm/UV hiện có |
| Lời khuyên tĩnh | Dùng advisory `summary/action/note`, trạng thái thiếu riêng; không đổi mô hình sinh lời khuyên |
| Lịch sử/dự báo tạo từ `makeHistory` | Không chép hàm tạo mẫu; cần nguồn/endpoint thật trước khi hiển thị đồ thị có giá trị |
| Sơ đồ hotspot năm điểm | Chỉ mượn style marker/list; không thay bản đồ thật bằng sơ đồ demo |
| Popup cảnh báo localStorage | Chỉ mượn layout; giữ backend và hành vi cảnh báo service nếu đã có. Không tuyên bố đã gửi push/email |
| Sáu nút scenario và nút thiếu dữ liệu | Chỉ trong preview/demo tách biệt và có nhãn; không cho phép ghi đè dữ liệu vận hành |
| Ảnh botanical | Chép asset nguồn sang `public/assets/botanical.png` khi triển khai, giữ ghi nhận nguồn trong tài liệu; không dùng screenshot cả trang làm UI |

`src/lib/air-quality.ts` hiện gom thành bốn mức và trả `moderate` khi AQI null. Đây là điểm cần xử lý rõ trong thiết kế ViewModel: thiếu số liệu phải hiện “Chưa có dữ liệu” và cảnh trung tính, không hiện “Trung bình” hoặc “Tốt”. Không sửa helper dùng chung/logic advisory như một thay đổi CSS; nếu cần sửa Model, lập thay đổi riêng và kiểm tra các nơi dùng.

Visual sáu mức của template cần được ánh xạ rõ với giá trị US AQI hợp lệ; không tự biến bốn nhãn nghiệp vụ hiện có thành sáu nhãn trong database. Nếu chưa thống nhất mapping, dùng scene trung tính và nhãn service. European AQI phải được ghi nhãn riêng, không áp ngưỡng US AQI lên giá trị đó.

Loading, chưa có dữ liệu, dữ liệu cũ và lỗi API là các trạng thái khác nhau. Không fallback sang số demo hoặc giờ máy khách. Hiển thị thời điểm hiệu lực từ `valid_at`, thời điểm nhận từ `fetched_at` khi cần; trình bày Asia/Ho_Chi_Minh (UTC+7). Ngưỡng dữ liệu cũ lấy từ chính sách service được duyệt, không tự đặt trong CSS.

## 9. Kiến trúc và phạm vi file khi triển khai

- **View:** page và component chỉ render props/state đã chuẩn bị; chia HeroScene, StorySection, ServiceWorkspace và SourceSection nếu phù hợp. Đây là cấu trúc đề xuất, không phải file hiện có.
- **ViewModel:** hooks/store quản lý địa điểm chọn, loading/error, kết quả API, trạng thái thiếu và action. Giữ MVVM; không gọi Supabase hoặc API nguồn ngoài trực tiếp trong component.
- **Model/API:** giữ endpoint, schema, scheduler, auth và cơ chế advisory. Không chép `dist/app.js` với thao tác DOM trực tiếp vào React; không mang `model.js` demo vào dữ liệu thật.
- `src/app/globals.css`: triển khai palette và typography mới, rà soát token cũ.
- `src/components/ui/button.tsx`: restyle đồng nhất nhưng giữ props/variant/asChild và focus semantics.
- `src/components/providers/lenis-provider.tsx`: rà soát một vòng RAF, cleanup và reduced motion; không tạo provider thứ hai.
- `src/app/page.tsx`: tổ chức ở nhà → mong muốn → cửa sổ → kiểm tra → quyết định → công cụ, giữ đường vào chức năng.
- Không thêm dependency chỉ để tạo reveal/cây đung đưa. Stack đã khai báo có GSAP/Lenis; trước khi viết code dùng thư viện, xác minh API/version bằng tài liệu chính thức theo AGENTS.md.

## 10. Responsive, accessibility và hiệu năng

- Bản 02: desktop >1000px chữ/nhân vật hai vùng; tablet 701–1000px thu typography và điện thoại. Mobile ≤700px chữ ở trên, chủ thể ảnh ở dưới; cảnh đọc điện thoại dài hơn nếu cần. Mục tiêu màn hình 360px không có tràn ngang; chưa xác nhận trực quan.
- Menu mobile vẫn chứa đầy đủ mục service và mở được bằng bàn phím; không sao chép quy tắc template ẩn nav mà không có phương án thay thế.
- Focus nhìn thấy, thứ tự tab theo thứ tự đọc, có skip link đến công cụ. Nút tối thiểu vùng chạm 44×44px; popup giữ focus và trả focus về nút mở.
- Nội dung vẫn đọc được khi animation không khởi tạo hoặc JavaScript animation lỗi. Không đặt opacity 0 vĩnh viễn làm mặc định cho section.
- Cây, nắng, haze là trang trí và bị bỏ qua bởi trình đọc màn hình; chỉ cập nhật live region cho thay đổi dữ liệu cần thiết, không đọc lại mỗi frame.
- Dành sẵn kích thước ảnh để tránh layout shift. Chỉ hero ưu tiên tải; phần nặng bên dưới tải khi phù hợp mà không xóa khả năng truy cập.
- Ưu tiên transform/opacity; giới hạn blur/haze lớn trên mobile. Không đưa WebGL hoặc animation liên tục vào chỉ vì package OGL có sẵn.
- Kiểm tra zoom 200%, viewport thấp, tiếng Việt dài và nhãn AQI nhiều dòng; không cắt timestamp hoặc chuẩn chỉ số.

## 11. Trình tự thực hiện và tiêu chí nghiệm thu

1. Chốt inventory tab/route/action ở working tree lúc triển khai, ghi rõ phần hiện có và phần chờ xây.
2. Vẽ mockup hero desktop/mobile và storyboard cảnh 0–4 theo tài liệu này. Theo AGENTS.md §5, cần người dùng xác nhận mockup trước khi sửa code UI. Việc viết tài liệu này chưa phải xác nhận một mockup chưa được tạo.
3. Đổi token/component style, giữ API component và chức năng.
4. Dựng hero và các section bằng dữ liệu từ ViewModel; nối đường tắt đến công cụ.
5. Thêm motion sau khi layout/interaction hoạt động; kiểm tra reduced motion và mobile.
6. Rà soát regression toàn bộ navigation, tìm kiếm, filter, dialog và trạng thái dữ liệu; chạy các kiểm tra sẵn có phù hợp thay đổi. Không tự tạo bộ test mới nếu chưa có yêu cầu/duyệt theo AGENTS.md §7.

Checklist bàn giao UI:

- [ ] Lần vào mới chỉ thấy hero theo tinh thần ảnh; CTA cuộn nằm trong vùng truy cập được.
- [ ] Bấm CTA tới `#explore`; wheel/touch/keyboard, URL hash và Back/Forward vẫn đúng.
- [ ] Có đường đi trực tiếp đến công cụ, không bắt xem hết câu chuyện.
- [ ] Không mất tab/route/action/quyền truy cập nào so với inventory service trước khi đổi UI.
- [ ] Dữ liệu, timestamp, nguồn và nhãn mô hình từ service; không còn fixture demo trong luồng thật.
- [ ] Không hiện nhiệt độ/biểu đồ/lời hứa tính năng khi backend chưa hỗ trợ.
- [ ] Loading/missing/stale/error hiển thị đúng; dữ liệu thiếu không tạo scene an toàn giả.
- [ ] Style thống nhất paper/ink/botanical/đường kẻ mảnh, không còn bóng neumorphic trong UI đã chuyển.
- [ ] Cây không che dữ liệu; số/nhãn AQI không bị animation làm chậm hoặc đổi sai.
- [ ] Mobile, zoom, keyboard, focus, reduced motion và fallback animation hoạt động.
- [ ] Mockup đã duyệt và code khớp mockup; kết quả kiểm tra được ghi đúng phạm vi thực tế.

## 12. Giới hạn của lần bàn giao này

Đã đối chiếu source template và source service; có HTML preview riêng để duyệt layout và nhịp kể chuyện. Preview dùng số liệu có nhãn minh họa, không nối API và không phải UI vận hành. Chưa chạy service hoặc xác nhận dữ liệu Supabase đang hoạt động; chưa sửa template nguồn hay triển khai giao diện thật. Không thêm tab nghiệp vụ, schema, dependency, hoặc sửa logic nghiệp vụ.

## 13. Nguồn xác minh và cách xem bản vẽ

- Template: `didung template/dist/index.html`, `styles.css`, `app.js`, `model.js`, `README.md`, `ASSETS.md`; đối chiếu thêm bản `D:\\Study\\didung template`. Palette và nhịp cây lấy từ mã nguồn này.
- [MDN — min-height](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height): chiều cao tối thiểu cho hero; cho phép nội dung dài hơn khi cần.
- [MDN — scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior): điều hướng anchor mượt của preview.
- [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion): tắt chuyển động theo tùy chọn hệ thống.
- [MDN — Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API): đã dùng trong bản vẽ 01, không còn là cơ chế cuộn của bản 02.
- Bản 02 xác minh thêm [MDN — position](https://developer.mozilla.org/en-US/docs/Web/CSS/position), [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame), [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect), [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia): sân khấu sticky, tiến trình cuộn và giảm chuyển động.
- DOM cho lựa chọn kết thúc: [replaceChildren](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren), [createTextNode](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode), [append](https://developer.mozilla.org/en-US/docs/Web/API/Element/append).
- Node.js chính thức: [HTTP](https://nodejs.org/api/http.html), [File system](https://nodejs.org/api/fs.html), [Path](https://nodejs.org/api/path.html), [URL](https://nodejs.org/api/url.html). Server preview được điều chỉnh từ `serve.mjs` có sẵn của template; chỉ bind `127.0.0.1` và phục vụ thư mục bản vẽ.

Mở trực tiếp `docs/design/landing-preview.html` trong trình duyệt, hoặc từ root repo chạy `node docs/design/serve-preview.mjs` rồi mở `http://127.0.0.1:4174/landing-preview.html`. Dừng bằng Ctrl+C. Không cần cài package. Asset cây được giữ trong `docs/design/assets/botanical.png` để preview độc lập với thư mục template chưa được Git theo dõi; nguồn ảnh ghi ở `ASSETS.md` của template và `docs/design/assets/README.md`.

Phạm vi preview bản 02: ba artwork mới, năm nhịp kể chuyện, sân khấu sticky, crossfade/zoom theo cuộn, điện thoại dữ liệu và ba nhánh kết thúc demo; CSS responsive và reduced motion. Chưa nối dữ liệu thật hoặc triển khai UI service. Môi trường kiểm tra không có trình duyệt kết nối (inventory trả rỗng), nên **chưa xác nhận hình ảnh desktop/mobile hoặc thao tác bằng trình duyệt**; không đánh dấu checklist UI là đã đạt.

Kiểm tra lần bàn giao: HTTP trả 200 cho HTML và ảnh; `node --check docs/design/serve-preview.mjs` và `git diff --check` thành công. `npm run lint` và `npm run build` không chạy được vì thiếu executable `eslint`/`next`. `npx tsc --noEmit` bị dừng khi không có kết quả trong môi trường thiếu dependency; chưa xác nhận typecheck. Không cài dependency hay viết bộ test mới trong bước thiết kế này.

Kiểm tra bản 02: `node --check docs/design/story-preview.js`, kiểm tra cú pháp server và `git diff --check` thành công. HTTP trả 200 cho HTML, CSS, JS và cả ba ảnh mới. Đã xem từng artwork qua kết quả ImageGen. Kiểm tra browser inventory lần nữa vẫn trả rỗng; chưa xác nhận layout, chuyển cảnh, ba nút demo hoặc reduced motion bằng trình duyệt. Các kiểm tra Next.js chưa được chạy lại vì dependencies của service vẫn thiếu và bản 02 chỉ sửa tài liệu/preview tách biệt, không thay code `src/`. Không tạo test suite hoặc cài package.

Bản 03: đã tạo và xem ba cảnh hoạt họa 2D bằng ImageGen tích hợp, sao chép vào `docs/design/assets/story-*-v3.png`, cập nhật mọi tham chiếu của preview hiện tại và lưu prompt cuối ở `docs/design/assets/story-assets.md`. Bản 02 được giữ ở `landing-preview-v2.html` với CSS/ảnh cũ. JavaScript qua kiểm tra cú pháp, `git diff --check` thành công; HTML, CSS và ba ảnh v3 đều trả HTTP 200. Chưa có xác nhận trực quan trong trình duyệt; không sửa `src/`, dependency hay nghiệp vụ. Mạch truyện và ba kết thúc giữ nguyên bản 02; chỉ thay hướng hình và bỏ bóng điện thoại. Các mô tả kiểm tra bản 01/02 phía trên là lịch sử, bản đề nghị duyệt hiện tại là 03.

Preview hiện tại thể hiện ở nhà → mong muốn ra ngoài → băn khoăn bên cửa sổ → kiểm tra cùng DiDung → quyết định → công cụ → nguồn. Khu vực công cụ là wireframe đánh dấu rõ, không tuyên bố những chức năng chưa có đã hoạt động. Khi duyệt cần xác nhận bố cục desktop/mobile, palette phẳng thay Soft UI, CTA và trình tự câu chuyện. Sau khi duyệt mới sửa UI service theo AGENTS.md §5.

Kiểm tra bản 04: HTML và CSS mới trả HTTP 200, đều chứa phần overlay đối chiếu 12 cột. `node --check docs/design/story-preview.js` và `git diff --check` thành công. Chỉ thay layout preview và tài liệu, không thay ảnh/JS/nghiệp vụ/`src/`. Chưa xác nhận trực quan trên browser vì môi trường chưa có trình duyệt kết nối; các giới hạn kiểm tra dependency của service phía trên vẫn còn.
