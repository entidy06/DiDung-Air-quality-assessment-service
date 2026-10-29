/** Illustrative display fixtures from landing-soft-preview.js, never live data. */
export const airExamples = {
  good: {
    aqi: "42",
    pm: "10 µg/m³",
    status: "● Tốt",
    note: "Một chỉ số để tham khảo. Kế hoạch vẫn do bạn chọn.",
  },
  bad: {
    aqi: "176",
    pm: "105 µg/m³",
    status: "● Xấu",
    note: "Một tình huống đáng cân nhắc lại kế hoạch ngoài trời. Đây là dữ liệu minh họa.",
  },
  missing: {
    aqi: "—",
    pm: "Chưa có dữ liệu",
    status: "○ Chưa có dữ liệu",
    note: "Chưa đủ thông tin để kết luận. DiDung không thay dữ liệu thiếu bằng trạng thái tốt.",
  },
} as const;

export type AirScenario = keyof typeof airExamples;

export const chartExamples = {
  forecast: {
    path: "M48 110Q100 110 151 102T254 80T357 88T460 106T563 116",
    area: "M48 110Q100 110 151 102T254 80T357 88T460 106T563 116V165H48Z",
    title: "DỰ BÁO MINH HỌA",
    caption: "Ví dụ US AQI: 42 → 48 → 65 → 59 → 45 → 38. Chỉ dùng để duyệt giao diện.",
    description: "Đường dự báo ví dụ có giá trị lần lượt 42, 48, 65, 59, 45, 38. Không phải dữ liệu thực tế.",
    dotY: 80,
    dash: "8 7",
  },
  history: {
    path: "M48 64Q100 64 151 80T254 98T357 92T460 104T563 110",
    area: "M48 64Q100 64 151 80T254 98T357 92T460 104T563 110V165H48Z",
    title: "LỊCH SỬ MINH HỌA",
    caption: "Ví dụ US AQI: 78 → 65 → 52 → 56 → 47 → 42. Chỉ dùng để duyệt giao diện.",
    description: "Đường lịch sử ví dụ có giá trị lần lượt 78, 65, 52, 56, 47, 42. Không phải dữ liệu thực tế.",
    dotY: 98,
    dash: "none",
  },
} as const;

export type ChartPeriod = keyof typeof chartExamples;
