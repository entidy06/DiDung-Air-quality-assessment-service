// Standalone mockup interactions only. No service requests, persistence or auth.
document.getElementById('login-button').addEventListener('click', () => {
  document.getElementById('login-preview').showModal();
});
const examples = {
  good: { aqi: '42', pm: '10 µg/m³', status: '● Tốt', note: 'Một chỉ số để tham khảo. Kế hoạch vẫn do bạn chọn.' },
  bad: { aqi: '176', pm: '105 µg/m³', status: '● Xấu', note: 'Một tình huống đáng cân nhắc lại kế hoạch ngoài trời. Đây là dữ liệu minh họa.' },
  missing: { aqi: '—', pm: 'Chưa có dữ liệu', status: '○ Chưa có dữ liệu', note: 'Chưa đủ thông tin để kết luận. DiDung không thay dữ liệu thiếu bằng trạng thái tốt.' },
};
document.querySelectorAll('[data-scenario]').forEach(button => {
  button.addEventListener('click', () => {
    const example = examples[button.dataset.scenario];
    document.getElementById('aqi-number').textContent = example.aqi;
    document.getElementById('pm-value').textContent = example.pm;
    document.getElementById('aqi-status').textContent = example.status;
    document.getElementById('scenario-note').textContent = example.note;
    document.querySelector('.air-panel').dataset.state = button.dataset.scenario;
    document.querySelectorAll('[data-scenario]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
const chartExamples = {
  forecast: { path: 'M48 110Q100 110 151 102T254 80T357 88T460 106T563 116', title: 'DỰ BÁO MINH HỌA', values: '42 → 48 → 65 → 59 → 45 → 38', description: 'Đường dự báo ví dụ có giá trị lần lượt 42, 48, 65, 59, 45, 38. Không phải dữ liệu thực tế.', dotY: 80 },
  history: { path: 'M48 64Q100 64 151 80T254 98T357 92T460 104T563 110', title: 'LỊCH SỬ MINH HỌA', values: '78 → 65 → 52 → 56 → 47 → 42', description: 'Đường lịch sử ví dụ có giá trị lần lượt 78, 65, 52, 56, 47, 42. Không phải dữ liệu thực tế.', dotY: 98 },
};
document.querySelectorAll('[data-period]').forEach(button => {
  button.addEventListener('click', () => {
    const example = chartExamples[button.dataset.period];
    document.getElementById('chart-line').setAttribute('d', example.path);
    document.getElementById('chart-line').setAttribute('stroke-dasharray', button.dataset.period === 'forecast' ? '8 7' : 'none');
    document.getElementById('chart-area').setAttribute('d', `${example.path}V165H48Z`);
    document.getElementById('chart-dot').setAttribute('cy', example.dotY);
    document.getElementById('chart-description').textContent = example.description;
    document.getElementById('chart-type').textContent = example.title;
    document.getElementById('chart-caption').textContent = `Ví dụ US AQI: ${example.values}. Chỉ dùng để duyệt giao diện.`;
    document.querySelectorAll('[data-period]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
const threshold = document.getElementById('threshold');
threshold.addEventListener('input', () => {
  document.getElementById('threshold-value').value = threshold.value;
  document.getElementById('notification-copy').textContent = `Ví dụ AQI ${Number(threshold.value) + 10}, ngưỡng cá nhân ${threshold.value}.`;
});
if ('IntersectionObserver' in window) {
  // Navigation follows reading position. Content is visible without JavaScript.
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.querySelectorAll('[data-chapter]').forEach(link => {
        if (link.dataset.chapter === entry.target.id) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('.chapter').forEach(chapter => observer.observe(chapter));
}
