import { SCENARIOS, LOCATIONS, categoryFor, searchLocations, makeHistory } from './model.js';

const $=id=>document.getElementById(id);
const state={location:LOCATIONS[0],value:42,missing:false};
const ns='http://www.w3.org/2000/svg';
const pollutantNames=['PM2.5','PM10','O₃','NO₂','CO','SO₂'];
const pollutantDescriptions=['Bụi mịn','Bụi thô','Ôzôn','Nitơ điôxít','Cacbon mônôxít','Lưu huỳnh điôxít'];
const pollutantUnits=['µg/m³','µg/m³','ppb','ppb','ppm','ppb'];
let alertSettings={};
let toastTimer;
try{const saved=JSON.parse(localStorage.getItem('khi-demo-alerts-v1')||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved)) alertSettings=saved;}catch{/* Storage is optional; controls still work for this visit. */}

function toast(message){
  clearTimeout(toastTimer);
  const box=$('toast');box.replaceChildren();
  box.append(document.createTextNode(message));
  const close=document.createElement('button');close.textContent='×';close.setAttribute('aria-label','Đóng thông báo');close.addEventListener('click',()=>{box.hidden=true;});box.append(close);box.hidden=false;
  toastTimer=setTimeout(()=>{box.hidden=true;},10000);
}
function currentAlert(){const entry=alertSettings[state.location.id];return entry && [51,101,151,201,301].includes(Number(entry.threshold))?entry:null;}
function updateAlertButton(){const preference=currentAlert();$('alert-open').textContent=preference?.enabled?'Cảnh báo demo: bật ↗':'Bật cảnh báo ↗';}
function checkAlert(){const preference=currentAlert();if(!state.missing&&preference?.enabled&&state.value>=Number(preference.threshold))toast(`Nhắc demo · ${state.location.name}: US AQI ${state.value}, ${categoryFor(state.value).label.toLowerCase()}. Đã chạm ngưỡng ${preference.threshold}.`);}
function svgEl(tag,attrs,text){const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));if(text!==undefined)el.textContent=text;return el;}

for(const s of SCENARIOS){
  const button=document.createElement('button');button.className='scenario-button';button.dataset.scenario=s.id;button.style.setProperty('--level-color',s.color);button.setAttribute('aria-pressed',String(s.id===0));button.setAttribute('aria-label',`${s.en}: ${s.label}, US AQI ${s.min}–${s.max}`);
  const name=document.createElement('span');name.className='scenario-label';name.textContent=s.label;
  const range=document.createElement('span');range.className='scenario-range';range.textContent=`${s.min}–${s.max}`;
  button.append(name,range);button.addEventListener('click',()=>{state.value=s.value;state.missing=false;render();checkAlert();});$('scenario-buttons').append(button);
  const item=document.createElement('div');item.className='legend-item';const dot=document.createElement('span');dot.style.background=s.color;const text=document.createElement('span');text.textContent=`${s.min}–${s.max} · ${s.label}`;const en=document.createElement('small');en.textContent=s.en;text.append(en);item.append(dot,text);$('aqi-legend').append(item);
}

function renderPollutants(s){
  $('pollutant-grid').replaceChildren();
  pollutantNames.forEach((name,i)=>{
    const item=document.createElement('div');item.className='pollutant';
    const heading=document.createElement('h3');heading.textContent=name;
    const value=document.createElement('p');value.className='pollutant-value';value.textContent=state.missing?'—':new Intl.NumberFormat('vi-VN',{maximumFractionDigits:1}).format(s.pollutants[i]);
    const unit=document.createElement('small');unit.textContent=pollutantUnits[i];value.append(unit);
    const description=document.createElement('p');description.className='pollutant-name';description.textContent=state.missing?'Chưa có dữ liệu':pollutantDescriptions[i];item.append(heading,value,description);$('pollutant-grid').append(item);
  });
}

function renderHistory(s){
  $('chart').replaceChildren();$('history-table').replaceChildren();$('forecast-list').replaceChildren();
  $('chart-detail').textContent=state.missing?'Chưa thể hiển thị diễn biến khi thiếu dữ liệu.':'Chạm, di chuột hoặc dùng phím Tab trên các điểm để xem từng giờ.';
  $('history-summary').textContent=state.missing?'Chưa có dữ liệu':'';
  $('chart').setAttribute('aria-label',state.missing?'Chưa có dữ liệu lịch sử':`Biểu đồ 24 giờ US AQI mô phỏng tại ${state.location.name}`);
  if(state.missing){const empty=document.createElement('p');empty.className='missing-chart';empty.textContent='Chưa có dữ liệu lịch sử';$('chart').append(empty);$('history-table').textContent='Chưa có dữ liệu.';$('forecast-list').innerHTML='<p class="missing-chart">Chưa có dự báo cho vị trí này.</p>';return;}
  const points=makeHistory(state.value);const vals=points.map(p=>p.value);const maxValue=Math.max(...vals);const ceiling=Math.max(100,Math.ceil(maxValue/50)*50);
  $('history-summary').textContent=`Thấp nhất ${Math.min(...vals)} / Cao nhất ${maxValue}`;
  const w=640,h=230,left=34,right=8,top=12,bottom=30;
  const x=i=>left+i*(w-left-right)/23;const y=v=>top+(ceiling-v)*(h-top-bottom)/ceiling;
  const svg=svgEl('svg',{viewBox:`0 0 ${w} ${h}`,'aria-hidden':'false'});
  for(const tick of [0,50,100,150,200,300,400,500].filter(t=>t<=ceiling)){
    svg.append(svgEl('line',{x1:left,y1:y(tick),x2:w-right,y2:y(tick),stroke:'#a4a18b','stroke-width':.6,'stroke-dasharray':tick===50?'3 5':'none'}));
    svg.append(svgEl('text',{x:left-9,y:y(tick)+4,'text-anchor':'end',class:'chart-label'},tick));
  }
  const coordinates=points.map((p,i)=>`${x(i)},${y(p.value)}`);
  svg.append(svgEl('polygon',{points:`${x(0)},${h-bottom} ${coordinates.join(' ')} ${x(23)},${h-bottom}`,fill:s.color,opacity:.07}));
  svg.append(svgEl('polyline',{points:coordinates.join(' '),fill:'none',stroke:s.color,'stroke-width':2.5,'stroke-linecap':'round','stroke-linejoin':'round'}));
  [0,6,12,18,23].forEach(i=>svg.append(svgEl('text',{x:x(i),y:h-7,'text-anchor':'middle',class:'chart-label'},points[i].time)));
  points.forEach((point,i)=>{
    const text=`${i<14?'17/10':'18/10'}, ${point.time} · US AQI ${point.value} · ${categoryFor(point.value).label} (demo)`;
    const circle=svgEl('circle',{cx:x(i),cy:y(point.value),r:4,class:'chart-point',tabindex:0,role:'img','aria-label':text});
    const selectPoint=()=>{$('chart-detail').textContent=text;};circle.addEventListener('mouseenter',selectPoint);circle.addEventListener('focus',selectPoint);circle.addEventListener('click',selectPoint);svg.append(circle);
  });
  svg.append(svgEl('circle',{cx:x(23),cy:y(points.at(-1).value),r:4,fill:s.color,'pointer-events':'none'}));$('chart').append(svg);
  const table=document.createElement('table');const caption=document.createElement('caption');caption.className='sr-only';caption.textContent='24 giờ US AQI demo, giờ ICT';table.append(caption);
  const head=document.createElement('thead');head.innerHTML='<tr><th scope="col">Ngày / Giờ ICT</th><th scope="col">US AQI</th><th scope="col">Mức độ</th></tr>';table.append(head);
  const body=document.createElement('tbody');points.forEach((p,i)=>{const row=document.createElement('tr');[`${i<14?'17/10':'18/10'} ${p.time}`,p.value,categoryFor(p.value).label].forEach(t=>{const cell=document.createElement('td');cell.textContent=t;row.append(cell);});body.append(row);});table.append(body);$('history-table').append(table);
  const future=[['15:00 · 18/10',12],['21:00 · 18/10',-6],['03:00 · 19/10',-11],['09:00 · 19/10',4]];
  for(const [time,delta] of future){const value=Math.max(0,Math.min(500,state.value+delta));const category=categoryFor(value);const row=document.createElement('div');row.className='forecast-row';const hour=document.createElement('p');hour.textContent=time;const number=document.createElement('strong');number.textContent=value;const label=document.createElement('span');label.textContent=category.label;row.append(hour,number,label);$('forecast-list').append(row);}
}

function chooseLocation(location){
  state.location=location;state.value=location.aqi;state.missing=false;$('location-search').value='';closeSearch();render();$('search-feedback').textContent=`Đang xem ${location.name}, US AQI ${location.aqi}, dữ liệu demo.`;checkAlert();
}
function renderMap(){
  $('map-markers').replaceChildren();$('hotspots').replaceChildren();
  for(const p of LOCATIONS){
    const selected=p.id===state.location.id;const missing=state.missing&&selected;const category=categoryFor(p.aqi);
    const marker=document.createElement('button');marker.className='map-marker';marker.id=`marker-${p.id}`;marker.style.left=`${p.x}%`;marker.style.top=`${p.y}%`;marker.style.setProperty('--marker-color',missing?'#777':category.color);marker.textContent=missing?'—':p.aqi;marker.setAttribute('aria-label',`${p.name}: ${missing?'chưa có dữ liệu':`US AQI ${p.aqi}, ${category.label}`} (demo)`);marker.setAttribute('aria-pressed',String(selected));marker.addEventListener('click',()=>{chooseLocation(p);$(`marker-${p.id}`).focus();$('map-status').textContent=`Đã chọn ${p.name}. Chỉ số chính và các phần dữ liệu đã cập nhật theo mẫu của điểm này.`;});$('map-markers').append(marker);
    const row=document.createElement('button');row.className='hotspot-row';row.id=`hotspot-${p.id}`;row.style.setProperty('--marker-color',category.color);row.setAttribute('aria-pressed',String(selected));const pin=document.createElement('span');pin.className='pin';pin.setAttribute('aria-hidden','true');const label=document.createElement('span');label.textContent=p.name;const detail=document.createElement('small');detail.textContent=missing?'Chưa có dữ liệu':category.label;label.append(detail);const val=document.createElement('strong');val.textContent=missing?'—':p.aqi;const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');row.append(pin,label,val,arrow);row.addEventListener('click',()=>{chooseLocation(p);$(`hotspot-${p.id}`).focus();$('map-status').textContent=`Đã chọn ${p.name}; xem dữ liệu demo tương ứng ở đầu trang.`;});$('hotspots').append(row);
  }
  $('map-status').textContent=state.missing?'Điểm đang chọn thiếu dữ liệu. Các điểm còn lại là các mẫu độc lập.':'Các điểm mẫu giữ dữ liệu riêng khi bạn thử 6 trạng thái hero.';
}

function render(){
  clearTimeout(toastTimer);$('toast').hidden=true;
  const s=categoryFor(state.value)||SCENARIOS[0];
  document.body.dataset.level=s.id;document.body.dataset.missing=state.missing;
  $('current-location').textContent=state.location.name;
  $('hero-title').replaceChildren();(state.missing?['Chờ một chút,','để hiểu khí trời.']:s.headline).forEach(t=>{const line=document.createElement('span');line.textContent=t;$('hero-title').append(line);});
  document.title=`DiDung — ${state.location.name} · ${state.missing?'Thiếu dữ liệu':`${state.value} US AQI (${s.label})`} · Demo`;
  $('hero-message').textContent=state.missing?'Dữ liệu đang tạm gián đoạn.':s.message;
  $('aqi-number').textContent=state.missing?'—':state.value;$('aqi-number').dataset.empty=String(state.missing);
  $('aqi-label').replaceChildren();const dot=document.createElement('span');dot.className='status-dot';dot.setAttribute('aria-hidden','true');$('aqi-label').append(dot,document.createTextNode(state.missing?'Chưa có dữ liệu':s.label));
  $('aqi-range').textContent=state.missing?'Không xác định mức US AQI':`${s.en} · ${s.min}–${s.max}`;
  $('hero-advice').textContent=state.missing?'Không xem số liệu thiếu là không khí tốt. Hãy kiểm tra một nguồn quan trắc đáng tin cậy.':s.advice;
  $('update-note').textContent=state.missing?'Lần nhận mẫu cuối: 09:00, 18/10/2026 · Chưa có bản mới':'Mốc cập nhật mẫu: 09:00, 18/10/2026 (ICT, UTC+7)';
  $('missing-notice').hidden=!state.missing;$('missing-toggle').setAttribute('aria-pressed',String(state.missing));$('missing-toggle').textContent=state.missing?'Khôi phục dữ liệu demo ↗':'Thử thiếu dữ liệu ↗';
  document.querySelectorAll('.scenario-button').forEach(b=>b.setAttribute('aria-pressed',String(!state.missing&&Number(b.dataset.scenario)===s.id)));
  $('scene-description').textContent=state.missing?'Cảnh trung tính khi thiếu số liệu; chưa gán mức US AQI.':`Minh họa: ${s.scene}.`;
  $('general-advice').textContent=state.missing?'Chưa đủ dữ liệu để đưa ra lời khuyên theo AQI tại vị trí này. Kiểm tra nguồn đo đáng tin cậy trước khi lên kế hoạch.':s.advice;
  $('sensitive-advice').textContent=state.missing?'Duy trì kế hoạch chăm sóc theo hướng dẫn của nhân viên y tế; không suy luận mức an toàn từ dữ liệu thiếu.':s.sensitive;
  renderPollutants(s);renderHistory(s);renderMap();updateAlertButton();
}

function closeSearch(){ $('search-results').hidden=true;$('location-search').setAttribute('aria-expanded','false'); }
function showSearch(){
  const results=searchLocations($('location-search').value);const container=$('search-results');container.replaceChildren();
  if(!results.length){const empty=document.createElement('p');empty.className='no-results';empty.textContent='Không tìm thấy trong 5 vị trí demo. Thử “Bến Thành” hoặc “Thảo Điền”.';container.append(empty);}else{
    for(const p of results){const button=document.createElement('button');button.type='button';const text=document.createElement('span');text.textContent=p.name;const sub=document.createElement('small');sub.textContent=p.area+' · Điểm demo';text.append(sub);const aqi=document.createElement('span');aqi.textContent=p.aqi+' AQI';button.append(text,aqi);button.addEventListener('click',()=>{chooseLocation(p);$('location-search').focus();closeSearch();});container.append(button);}
  }
  container.hidden=false;$('location-search').setAttribute('aria-expanded','true');$('search-feedback').textContent=`${results.length} vị trí demo phù hợp.`;
}
$('location-search').addEventListener('input',showSearch);$('location-search').addEventListener('focus',showSearch);
$('search-form').addEventListener('submit',event=>{event.preventDefault();const results=searchLocations($('location-search').value);if(results.length===1){chooseLocation(results[0]);}else{showSearch();$('search-results').querySelector('button')?.focus();}});
$('location-search').addEventListener('keydown',event=>{if(event.key==='Escape')closeSearch();if(event.key==='ArrowDown'){event.preventDefault();showSearch();$('search-results').querySelector('button')?.focus();}});
$('search-results').addEventListener('keydown',event=>{const buttons=[...$('search-results').querySelectorAll('button')];const index=buttons.indexOf(document.activeElement);if(event.key==='Escape'){event.preventDefault();$('location-search').focus();closeSearch();}if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();buttons[(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length]?.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.search-wrap'))closeSearch();});
document.addEventListener('focusin',event=>{if(!event.target.closest('.search-wrap'))closeSearch();});
$('missing-toggle').addEventListener('click',()=>{state.missing=!state.missing;render();});
$('retry-data').addEventListener('click',()=>{state.missing=false;render();$('missing-toggle').focus();toast('Đã khôi phục dữ liệu demo. Chưa kết nối nguồn quan trắc trực tiếp.');checkAlert();});
$('alert-open').addEventListener('click',()=>{const preference=currentAlert();$('alert-threshold').value=preference?String(preference.threshold):'101';$('alert-enabled').checked=preference?Boolean(preference.enabled):true;$('alert-location-label').textContent=`Áp dụng cho ${state.location.name}, TP.HCM (điểm demo).`;$('alert-dialog').showModal();});
$('close-alert').addEventListener('click',()=>$('alert-dialog').close());
$('alert-dialog').addEventListener('click',event=>{if(event.target===$('alert-dialog')){const rect=$('alert-dialog').getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)$('alert-dialog').close();}});
$('alert-form').addEventListener('submit',event=>{event.preventDefault();alertSettings[state.location.id]={threshold:Number($('alert-threshold').value),enabled:$('alert-enabled').checked};let saved=true;try{localStorage.setItem('khi-demo-alerts-v1',JSON.stringify(alertSettings));}catch{saved=false;}$('alert-dialog').close();updateAlertButton();toast(saved?'Đã lưu lời nhắc demo cho '+state.location.name+'. Chỉ nhắc khi bạn tương tác trong trang.':'Đã áp dụng cho lượt xem này; trình duyệt không cho lưu tùy chọn.');checkAlert();});

render();
