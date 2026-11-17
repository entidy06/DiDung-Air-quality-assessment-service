# PA2 — Đánh giá accessibility của thiết kế DiDung

Ngày đánh giá: **02/11/2026**. Jira: [DID-52 — Đánh giá accessibility cơ bản của prototype](https://ntdat2428.atlassian.net/browse/DID-52).

**Kết luận:** Thiết kế đáp ứng một số tiêu chí về nhãn, biểu diễn AQI ngoài màu sắc và khả năng đọc trong các vùng mobile đã kiểm tra. Contrast của nút đăng nhập đạt yêu cầu. Chưa đủ bằng chứng để kết luận đạt cho toàn bộ thiết kế. Focus/keyboard trên implementation, kiểm tra đầy đủ các trạng thái và phê duyệt của thành viên khác còn **PENDING**.

## 1. Phạm vi đánh giá

Thiết kế được đánh giá: [DiDung design — 24:30405](https://www.figma.com/design/Ev67pGKl766yRwq4R7nu7G/DiDung-design?node-id=24-30405).

File có ba trang Low Fidelity Wireframes, High Fidelity Mockups và Interactive Prototype, với các nhóm màn hình SCR-01–07 cho desktop/mobile. Phạm vi kiểm tra chi tiết gồm vùng AQI, thang phân loại và biểu đồ trên SCR-02 Mobile; form đăng nhập trên SCR-05 Mobile; một phần form cài đặt ngưỡng trên SCR-06 Mobile. Các frame, trạng thái và luồng tương tác còn lại chưa được kiểm tra đầy đủ.

Kết quả áp dụng cho nội dung đã quan sát ngày 02/11/2026. Chưa có version ID cố định hoặc bộ ảnh xuất kèm theo. Các liên kết node dẫn đến nội dung hiện hành và có thể thay đổi sau đánh giá.

Quy ước kết quả:

- **PASS:** đáp ứng tiêu chí trong phạm vi có minh chứng.
- **FAIL:** có vi phạm được xác nhận bằng quan sát hoặc số đo cụ thể.
- **PENDING:** chưa đủ bằng chứng hoặc cần kiểm thử trên implementation.

Chưa ghi nhận FAIL được xác nhận trong phạm vi đã đo. Các mục PENDING chưa được tính là đạt.

## 2. Checklist đánh giá

| ID | Tiêu chí | Kết quả | Nhận xét và đánh giá | Nội dung cần hoàn thiện |
|---|---|---|---|---|
| A11Y-01 | Contrast chữ trên nút đăng nhập | **PASS — một nút** | Chữ Arimo Bold 15px, màu `#FFF9F0` trên nền `#597928`, đạt **4,787:1**, cao hơn ngưỡng 4,5:1 dành cho chữ thường. Cỡ 15px bold chưa thuộc nhóm chữ lớn. Minh chứng E02/E03. | Kiểm tra các nút và trạng thái còn lại. |
| A11Y-02 | Contrast nội dung, chú thích, nguồn và thời gian | **PENDING** | Chưa có đủ số đo màu chữ/nền, opacity và cỡ chữ cho toàn bộ nội dung. Kết quả của nút đăng nhập chưa đại diện cho toàn bộ palette. | Đo từng cặp màu thực tế, bao gồm placeholder, legend, lỗi và trạng thái tương tác. |
| A11Y-03 | Contrast viền control, icon và focus indicator | **PENDING** | Input và card sử dụng shadow theo phong cách neumorphism. Chưa có số đo xác nhận mức phân biệt của viền, icon và trạng thái focus với nền liền kề. | Kiểm tra contrast chi tiết cần thiết để nhận biết control/state theo WCAG 1.4.11. |
| A11Y-04 | Nhãn trường nhập và đơn vị dữ liệu | **PASS — vùng đã kiểm tra** | Form đăng nhập có nhãn Email, Mật khẩu riêng với placeholder. Màn tổng quan có nhãn khu vực, chỉ số AQI, PM2.5 và đơn vị µg/m³. Nội dung nhập và ý nghĩa số liệu được thể hiện bằng chữ. Minh chứng E01/E02. | Rà nhãn của các form, select và hành động chỉ có icon còn lại. |
| A11Y-05 | Liên kết label, lỗi và accessible name | **PENDING implementation** | Nhãn nhìn thấy trên thiết kế chưa đủ để xác nhận accessible name, liên kết label với input hoặc liên kết thông báo lỗi. | Kiểm tra HTML/accessibility tree, `label`, `aria-describedby`, `aria-invalid` và cách xử lý focus lỗi. |
| A11Y-06 | Không dùng riêng màu sắc để báo AQI | **PASS — card và thang AQI trên SCR-02 Mobile** | Giá trị `42` đi kèm mức `Tốt`; sáu dải AQI có khoảng số và tên mức. Trường hợp thiếu dữ liệu được giải thích bằng dấu `—`, không phân loại thành Tốt. Thông tin vẫn có nghĩa khi không phân biệt được màu. Minh chứng E01. | Đối chiếu cùng quy tắc trên desktop, bản đồ và thông báo. |
| A11Y-07 | Phân biệt lịch sử và dự báo | **PASS — biểu diễn trực quan trên SCR-02 Mobile** | Chú giải và biểu đồ phân biệt lịch sử bằng nét liền, dự báo bằng nét đứt. Vùng tô nhạt có giải thích là khoảng bất định minh họa. Minh chứng E01. | Kiểm tra các biểu đồ khác và bổ sung dữ liệu tương đương dạng bảng hoặc văn bản trên implementation. |
| A11Y-08 | Đặc tả focus và thứ tự điều hướng | **PENDING** | Chưa có đủ minh chứng về các focus variant và thứ tự focus của toàn bộ control. | Hoàn thiện đặc tả cho navigation, selector, tabs, input, menu và dialog; nêu cách trả focus khi đóng overlay. |
| A11Y-09 | Keyboard, focus visible và không mắc kẹt focus | **PENDING implementation** | Chưa kiểm thử Tab/Shift+Tab, Enter/Space, Escape, thứ tự focus và keyboard trap trên ứng dụng thực tế. Chưa đủ cơ sở ghi keyboard PASS. | Thực hiện K01–K04 và lưu môi trường, phiên bản cùng minh chứng kiểm thử. |
| A11Y-10 | Khả năng đọc trên mobile | **PASS — các vùng đã kiểm tra ở 390px** | Frame SCR-02 Mobile có bố cục dọc, rộng 390px. Trong vùng card AQI, legend, biểu đồ và form SCR-05 đã xem ở zoom thiết kế 100%, chưa ghi nhận chữ chồng hoặc bị cắt. Minh chứng E01–E03. | Rà toàn bộ nội dung dài, header, menu, footer và kiểm tra trên thiết bị thật. |
| A11Y-11 | Kích thước vùng bấm | **PASS — kích thước thiết kế của nút đăng nhập** | Nút đăng nhập có kích thước 302 × 48px, min-height 48px. Kích thước thuận lợi cho thao tác chạm; chưa xác nhận vùng tương tác thực tế trên HTML. Minh chứng E03. | Kiểm tra mọi nút, link và icon theo WCAG 2.5.8, bao gồm ngoại lệ và khoảng cách khi áp dụng. |
| A11Y-12 | Reflow và phóng to nội dung | **PENDING implementation** | Frame 390px chưa chứng minh nội dung đáp ứng ở 320 CSS px hoặc khi zoom trình duyệt 200–400%. | Kiểm tra mất nội dung, overlap và cuộn hai chiều ở các kích thước; đánh giá riêng phần bản đồ/biểu đồ cần bố cục 2D. |
| A11Y-13 | Loading, empty, stale, error và hết phiên | **PENDING** | Có layer tham chiếu trạng thái nhưng chưa kiểm tra đầy đủ nội dung và các nhánh chuyển trạng thái. | Đối chiếu nhãn chữ, nguồn/thời gian, hành động tiếp theo và cách thể hiện dữ liệu thiếu/cũ. |
| A11Y-14 | Tương tác và giới hạn prototype Figma | **PENDING** | Có các nhóm Journey desktop/mobile; chưa walkthrough toàn bộ hotspot. Prototype chưa chứng minh hành vi keyboard, screen reader, xác thực, lưu dữ liệu hoặc xử lý lỗi API của implementation. | Lưu kết quả từng luồng, trigger, destination và trạng thái dự kiến; kiểm thử implementation riêng. |
| A11Y-15 | File chỉnh sửa được và liên kết truy vết | **PASS tài liệu / PENDING hồ sơ thiết kế** | Báo cáo được lưu dưới dạng Markdown, có liên kết Figma, requirement/use-case và Jira. Mapping còn chờ xác nhận theo revision SRS. | Bổ sung named version Figma, ảnh/export và liên kết repository sau khi công bố tài liệu. |
| A11Y-16 | Review độc lập, xử lý phản hồi và approval | **PENDING** | Đã gửi yêu cầu review cho Hào trên DID-52. Chưa có phản hồi hoặc approval được ghi nhận trong bộ minh chứng hiện có. | Bổ sung nhận xét thực tế, cách xử lý từng phản hồi, phiên bản sửa và kết quả duyệt lại. |

## 3. Minh chứng

| Mã | Nguồn | Nội dung đối chiếu |
|---|---|---|
| E01 | [SCR-02 Tổng quan không khí Mobile — 24:26057](https://www.figma.com/design/Ev67pGKl766yRwq4R7nu7G/DiDung-design?node-id=24-26057) | Bố cục dọc, rộng 390px, cao Hug 3734px, min-height 844px. AQI 42/Tốt; PM2.5 10 µg/m³; sáu dải phân loại có số và tên; lịch sử nét liền/dự báo nét đứt. Có nhãn Open-Meteo/CAMS, dữ liệu mô hình, thời gian hiệu lực mẫu 08:00 ngày 29/10/2026 UTC+7 và thông báo dữ liệu minh họa. |
| E02 | [SCR-05 Đăng nhập Mobile — 24:27908](https://www.figma.com/design/Ev67pGKl766yRwq4R7nu7G/DiDung-design?node-id=24-27908) | Frame rộng 390px, cao Hug 1838px. Form có nhãn Email/Mật khẩu, placeholder, hướng dẫn mật khẩu, đăng nhập Google, Quên mật khẩu và nút Đăng nhập. |
| E03 | [Nhãn nút Đăng nhập — 24:29919](https://www.figma.com/design/Ev67pGKl766yRwq4R7nu7G/DiDung-design?node-id=24-29919) | Arimo Bold, weight 700, 15px, line-height 130%, màu chữ #FFF9F0. Nền của Action chứa nhãn là #597928; kích thước Action 302 × 48px, min-height 48px. |
| E04 | [SCR-06 Cài đặt ngưỡng Mobile — 24:28252](https://www.figma.com/design/Ev67pGKl766yRwq4R7nu7G/DiDung-design?node-id=24-28252) | Phần đã xem có nhãn PM2.5 (µg/m³), ví dụ 12,5; Lưu ngưỡng/Hủy; ghi chú thao tác minh họa; rule có chữ Bật, Tắt quy tắc, Xóa quy tắc. Error state, comparator và toggle semantics chưa được xác minh đầy đủ. |
| E05 | [DID-52](https://ntdat2428.atlassian.net/browse/DID-52) | Issue accessibility; trạng thái ghi nhận tại thời điểm đánh giá là In review. DID-50 liên quan inventory, DID-51 liên quan prototype. |
| E06 | [Comment yêu cầu review — 10045](https://ntdat2428.atlassian.net/browse/DID-52?focusedCommentId=10045) | Có yêu cầu review gửi Hào, bảng kết quả, số đo và liên kết node. Minh chứng xác nhận yêu cầu đã gửi; chưa xác nhận review đã hoàn tất. |

E01–E04 là ghi chép quan sát và thuộc tính thiết kế. Bộ ảnh xuất, version ID cố định và recording luồng tương tác còn PENDING.

Contrast được tính theo relative luminance sRGB và công thức `(L sáng + 0,05) / (L tối + 0,05)`. Cặp màu E03 có kết quả chưa làm tròn **4.787305610567221:1**; ngưỡng đánh giá là 4,5:1. Các cặp có opacity hoặc lớp nền khác cần được tính riêng.

## 4. Liên kết requirement, use case và Jira

Mapping dưới đây đối chiếu theo nội dung màn và hồ sơ PA2 ngày 02/11/2026, còn chờ BA xác nhận revision SRS. 

| Màn hình / hành vi | Requirement / use case liên quan | Jira | Đánh giá truy vết |
|---|---|---|---|
| SCR-02 Tổng quan không khí | FR-03; UC-01/UC-09; NFR-04/07 | DID-50, DID-51, DID-52 | Đã đối chiếu các vùng nêu trong E01; mapping chờ xác nhận. |
| SCR-03 Dự báo ngắn hạn | FR-05; UC-02/UC-09; NFR-04/07 | DID-51, DID-52 | Cần đối chiếu metric, horizon, thời gian và nguồn với SRS. |
| SCR-04 Bản đồ & lịch sử | FR-04; UC-03/UC-09; NFR-04/07 | DID-50, DID-51, DID-52 | Chưa kiểm tra chi tiết bản đồ và nội dung thay thế. |
| SCR-05 Đăng nhập | UC-04; NFR-04/07 | DID-51, DID-52 | Nhãn và nút đã đối chiếu; FR xác thực chờ BA xác nhận. |
| SCR-06 Cài đặt ngưỡng | UC-06; NFR-04/07 | DID-51, DID-52 | Đã đối chiếu một phần; FR và BR-05 chờ xác nhận. |
| SCR-07 Trung tâm thông báo | UC-07; NFR-04/07 | DID-51, DID-52 | Chưa kiểm tra chi tiết nội dung và semantics. |
| Dữ liệu cũ, thiếu hoặc lỗi | FR-10; UC-10/UC-09; NFR-04/07 | DID-51, DID-52 | Walkthrough trạng thái và kiểm thử implementation còn PENDING. |

SCR-01 đóng vai trò điểm vào và điều hướng; mapping với các UC đích cần được xác nhận trong screen inventory. UC-08 là xử lý ingest nền, UC-11 là đánh giá ngưỡng và tạo thông báo; giao diện thông báo chưa đủ chứng minh các xử lý nền này đã hoàn tất.

## 5. Nội dung pending kiểm thử implementation

Các nội dung dưới đây chưa có kết quả thực thi.

| ID | Nội dung kiểm tra | Điều kiện đạt | Trạng thái |
|---|---|---|---|
| K01 | Tab/Shift+Tab qua navigation, location, tabs, form và hành động tài khoản | Thứ tự hợp lý, không bỏ control; focus nhìn thấy và không bị che. | **PENDING** |
| K02 | Enter/Space, phím mũi tên và Escape với widget phù hợp | Kích hoạt đúng; đóng overlay và trả focus về trigger; không mắc kẹt focus. | **PENDING** |
| K03 | Form sai, lỗi máy chủ và hết phiên | Lỗi liên kết đúng trường, được đọc bằng screen reader; focus hợp lý, giữ dữ liệu nhập khi phù hợp. | **PENDING** |
| K04 | Điều khiển bản đồ, biểu đồ và chọn vị trí | Có thao tác keyboard và nội dung tương đương; không phụ thuộc riêng hover/drag. | **PENDING** |
| K05 | Viewport 320/390/768/1440 CSS px, zoom 200–400% và text spacing | Không mất nhãn, đơn vị, thời gian hoặc hành động; không overlap; cuộn 2D chỉ áp dụng khi phù hợp tiêu chí. | **PENDING** |
| K06 | Màu thực tế, vùng bấm, accessible name/role/value và cập nhật trạng thái | Đạt các tiêu chí tương ứng trên ứng dụng đã triển khai. | **PENDING** |

Minh chứng cần kèm URL, build/commit, trình duyệt, thiết bị, ngày kiểm tra và ảnh hoặc recording phù hợp.

## 6. Review nhóm và xử lý phản hồi

Người được đề nghị review: **Võ Đình Cao Minh Hào**. Người phụ trách DID-52: **Nguyễn Thành Đạt**. Yêu cầu review đã được ghi tại E06.

| Nội dung | Kết quả ghi nhận | Trạng thái |
|---|---|---|
| Gửi yêu cầu review | Có comment 10045 trên DID-52. | Đã gửi |
| Xác nhận nhận review | Chưa có minh chứng trong hồ sơ đánh giá. | **PENDING** |
| Nhận xét của reviewer | Chưa có phản hồi được ghi nhận. | **PENDING** |
| Sửa theo phản hồi | Chưa có phản hồi để đối chiếu thay đổi. | **PENDING** |
| Approval | Chưa có xác nhận phê duyệt. | **PENDING** |

Mỗi phản hồi cần ghi finding ID, nhận xét, quyết định xử lý, node/version thay đổi và kết quả kiểm tra lại. Trạng thái In review và việc gửi yêu cầu chưa đáp ứng điều kiện approval.

## 7. Change notes và đánh giá Definition of Done

| Nội dung cập nhật | Kết quả |
|---|---|
| Báo cáo đánh giá | Đã lưu dưới dạng Markdown tại `docs/design/pa2/accessibility-review.md`, có checklist, minh chứng và truy vết. |
| Số đo contrast | Đã ghi số đo của nút Đăng nhập từ thuộc tính thiết kế hiện tại. |
| Kết quả thiết kế và implementation | Đã phân biệt PASS trong phạm vi quan sát với PENDING cần kiểm thử thực tế. |
| Minh chứng teamwork | Đã liên kết comment yêu cầu review; phản hồi và approval còn PENDING. |
| Chỉnh sửa canvas và phiên bản sau sửa | Chưa có thay đổi canvas hoặc version sau sửa được ghi nhận. |
| Biên tập báo cáo | Đã chuyển nội dung sang nhận xét theo tiêu chí; giữ nguyên số đo, giới hạn kiểm tra và trạng thái chưa hoàn tất. |

**Definition of Done: CHƯA HOÀN TẤT.** Báo cáo và yêu cầu review đã có minh chứng. Các mục còn lại gồm kiểm tra contrast/state/interaction trong phạm vi chưa đánh giá, lưu version và ảnh thiết kế, xác nhận mapping với SRS, nhận phản hồi độc lập và ghi nhận kết quả xử lý. Keyboard và các hành vi accessibility trên implementation tiếp tục PENDING.

## 8. Tiêu chí tham chiếu

- [WCAG 2.2 — Contrast Minimum, 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Use of Color, 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [Labels or Instructions, 3.3.2](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)
- [Keyboard, 2.1.1](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
- [Focus Visible, 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [Reflow, 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [Target Size Minimum, 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
