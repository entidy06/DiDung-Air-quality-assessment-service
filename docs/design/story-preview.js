// Design preview only: no API requests, production state, or environmental inference.
const track = document.querySelector('.story-track');
const beats = [...document.querySelectorAll('.beat')];
const room = document.querySelector('.scene-room');
const windowScene = document.querySelector('.scene-window');
const outside = document.querySelector('.scene-outside');
const caption = document.querySelector('#scene-caption');
const progress = document.querySelector('#film-progress');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const captions = ['Ở nhà', 'Muốn ra ngoài', 'Nhìn qua cửa sổ', 'Kiểm tra cùng DiDung', 'Một quyết định'];
let scheduled = false;

function renderStory() {
  scheduled = false;
  if (reducedMotion.matches) return;
  const height = window.innerHeight;
  const focusLine = height * .5;
  let current = 0;
  for (let index = 0; index < beats.length; index += 1) {
    if (beats[index].getBoundingClientRect().top <= focusLine) current = index;
  }
  const rect = track.getBoundingClientRect();
  const distance = Math.max(1, rect.height - height);
  const fraction = Math.max(0, Math.min(1, -rect.top / distance));
  const isEnding = current === 4 && document.body.dataset.scenario === 'good';
  room.style.opacity = current < 2 || (current === 4 && !isEnding) ? '1' : '0';
  windowScene.style.opacity = current === 2 || current === 3 ? '1' : '0';
  outside.style.opacity = isEnding ? '1' : '0';
  // Move toward the window as the wish forms; never animate environmental data.
  room.firstElementChild.style.transform = `scale(${1.025 + Math.min(fraction, .5) * .1})`;
  windowScene.firstElementChild.style.transform = `scale(${1.025 + fraction * .025})`;
  caption.textContent = `0${current + 1} / 05 — ${captions[current]}`;
  progress.style.transform = `scaleX(${Math.max(.025, fraction)})`;
}

function scheduleRender() {
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(renderStory);
  }
}

const scenarios = {
  good: {
    value: '42', category: 'Tốt', pm: '7.6 µg/m³',
    summary: 'Chỉ số đang ở mức tốt trong tình huống minh họa này.',
    title: ['Hôm nay,', 'mình chọn', 'bước ra ngoài.'],
    copy: ['Mình đã xem thông tin nơi sắp đến.', 'Buổi đi dạo bắt đầu từ một chút chuẩn bị.'],
    note: ['Không phải vì trời trông đẹp.', 'Mà vì mình đã tìm hiểu trước khi đi.'],
  },
  poor: {
    value: '176', category: 'Xấu', pm: '83 µg/m³',
    summary: 'Chỉ số đang ở mức xấu trong tình huống minh họa này.',
    title: ['Hôm nay,', 'mình chọn', 'một kế hoạch khác.'],
    copy: ['Chuyến đi bộ có thể để sau.', 'Mình ở lại, mở sách và theo dõi thông tin.'],
    note: ['Muốn ra ngoài không có nghĩa phải đi ngay.', 'Đổi kế hoạch cũng là một quyết định của mình.'],
  },
  missing: {
    value: '—', category: 'Chưa có dữ liệu', pm: '—',
    summary: 'Chưa đủ thông tin để đánh giá điều kiện tại nơi sắp đến.',
    title: ['Chưa đủ rõ,', 'mình chưa', 'quyết định vội.'],
    copy: ['Mình chờ cập nhật hoặc kiểm tra lại nguồn.', 'Câu chuyện dừng một nhịp ngay trước cánh cửa.'],
    note: ['Một khoảng trống dữ liệu', 'không phải một lời hứa rằng không khí tốt.'],
  },
};

function setLines(element, lines, emphasizeLast = false) {
  element.replaceChildren();
  lines.forEach((line, index) => {
    if (index) element.append(document.createElement('br'));
    if (emphasizeLast && index === lines.length - 1) {
      const emphasis = document.createElement('em');
      emphasis.textContent = line;
      element.append(emphasis);
    } else {
      element.append(document.createTextNode(line));
    }
  });
}

document.querySelectorAll('button[data-scenario]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.scenario;
    const scenario = scenarios[key];
    document.body.dataset.scenario = key;
    document.querySelector('[data-value]').textContent = scenario.value;
    document.querySelector('[data-category]').textContent = scenario.category;
    document.querySelector('[data-pm]').textContent = scenario.pm;
    document.querySelector('[data-summary]').textContent = scenario.summary;
    setLines(document.querySelector('[data-ending-title]'), scenario.title, true);
    setLines(document.querySelector('[data-ending-copy]'), scenario.copy);
    setLines(document.querySelector('[data-ending-note]'), scenario.note);
    document.querySelectorAll('button[data-scenario]').forEach(control => {
      control.setAttribute('aria-pressed', String(control === button));
    });
    scheduleRender();
  });
});

document.body.classList.add('enhanced');
window.addEventListener('scroll', scheduleRender, {passive: true});
window.addEventListener('resize', scheduleRender);
window.addEventListener('pageshow', scheduleRender);
reducedMotion.addEventListener('change', scheduleRender);
scheduleRender();
