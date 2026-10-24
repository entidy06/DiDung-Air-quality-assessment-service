# design.md — Design System

Phong cách UI toàn site: **Neumorphism (Soft UI)**. Mọi UI phải tuân theo file này; bản vẽ UI (AGENTS.md §4) cũng vậy.

## 1. Palette (cố định, không thêm màu ngoài danh sách)

| Token | Hex | Vai trò |
| --- | --- | --- |
| `--cream` | `#FCECD8` | **Nền chính** của site và bề mặt mọi component neumorphic |
| `--brown` | `#6E3511` | Chữ chính, icon, tiêu đề |
| `--olive` | `#597928` | Màu chủ đạo (primary), nút chính, trạng thái tốt |
| `--forest` | `#486C2F` | Primary hover/active, focus ring |
| `--sage` | `#91AC67` | Màu phụ, biểu đồ, nhãn nhẹ, track của slider/progress |
| `--butter` | `#F1E5A1` | Highlight, secondary/muted surface, trạng thái trung bình/lưu ý |
| `--orange` | `#EF6905` | Accent, cảnh báo, điểm nhấn hành động |
| `--crimson` | `#8B2626` | Lỗi, nguy hiểm, destructive, trạng thái xấu |

Token đã khai báo trong `src/app/globals.css` và ánh xạ sang biến shadcn (`--primary`, `--destructive`, ...).

Quy tắc dùng màu:
- Chữ trên nền cream: `brown`. Chữ trên `olive`/`forest`/`crimson`: `cream`. Chữ trên `orange`/`butter`/`sage`: `brown` (không dùng cream/trắng vì thiếu tương phản).
- Màu **không** được là kênh truyền thông tin duy nhất; kèm icon hoặc nhãn.
- Không dùng đen/trắng thuần, không dùng gradient màu ngoài palette.

## 2. Neumorphism

Bề mặt cùng màu nền (`cream`), nổi/lõm bằng **hai bóng đổ đối xứng**: sáng ở góc trên-trái, tối ở góc dưới-phải. Hai tông bóng là **tint dẫn xuất từ cream** (ngoại lệ duy nhất của §1):

| Token | Hex | Dùng cho |
| --- | --- | --- |
| `--neu-light` | `#FFF9F0` | Bóng sáng (-x,-y) |
| `--neu-dark` | `#D9C7AE` | Bóng tối (+x,+y) |

Trạng thái:

| Trạng thái | Shadow | Tailwind |
| --- | --- | --- |
| Nổi (card, panel) | `8px 8px 16px dark, -8px -8px 16px light` | `shadow-neu` |
| Nổi nhỏ (button, chip) | `4px 4px 8px dark, -4px -4px 8px light` | `shadow-neu-sm` |
| Lõm/pressed (input, button active, track) | `inset 6px 6px 12px dark, inset -6px -6px 12px light` | `shadow-neu-inset` |

Quy tắc:
- Border: không dùng (`--border: transparent`); phân tách bằng shadow.
- Bo góc lớn: `--radius` = 1.25rem (`rounded-lg`); phần tử nhỏ `rounded-md`/`rounded-sm`.
- Nút: nổi → hover nổi hơn → active lõm. Nút primary nền `olive`, hover `forest`.
- Input/ô nhập: luôn **lõm** (`shadow-neu-inset`), nền `cream`.
- Focus: ring 2px `forest`, không bỏ outline mà không thay thế.
- Chuyển động ngắn (~200ms) trên `box-shadow`; tôn trọng `prefers-reduced-motion`.
- Không lồng nhiều lớp nổi chồng nhau; tối đa 2 mức độ sâu trong một khu vực.
- Một chế độ sáng duy nhất (nền cream); không có dark mode trừ khi spec được duyệt.

## 3. Thành phần UI

- Dùng shadcn/ui (`src/components/ui`), **chỉnh theo neumorphism** ở đây thay vì style lẻ trong trang.
- Component mới phải dùng token ở §1–§2, không hard-code hex trong JSX.
- Trạng thái chất lượng không khí (gợi ý, cần chốt trong spec/bản vẽ): tốt `olive` · trung bình `butter` · nhạy cảm `orange` · xấu `crimson`; kèm nhãn chữ.
