export const SCENARIOS = [
  {id:0, value:42, min:0, max:50, label:'Tốt', en:'Good', color:'#397447', headline:['Một nhịp thở,','một ngày xanh.'], message:'Không khí hôm nay thật dễ chịu.', advice:'Bạn có thể tận hưởng các hoạt động ngoài trời như thường lệ.', sensitive:'Nhóm nhạy cảm có thể sinh hoạt bình thường; chú ý phản ứng riêng của cơ thể.', scene:'Trời sáng, lá xanh và nắng dịu', pollutants:[7.6,19,22,11,0.4,3]},
  {id:1, value:78, min:51, max:100, label:'Trung bình', en:'Moderate', color:'#a37c15', headline:['Chậm một chút,','lắng nghe khí trời.'], message:'Không khí ở mức chấp nhận được.', advice:'Phần lớn mọi người có thể tiếp tục các hoạt động thường ngày.', sensitive:'Nếu đặc biệt nhạy cảm với ô nhiễm, cân nhắc giảm thời gian vận động ngoài trời khi thấy khó chịu.', scene:'Nắng nhạt, bầu trời hơi mờ', pollutants:[22.4,42,35,19,0.7,6]},
  {id:2, value:128, min:101, max:150, label:'Kém cho nhóm nhạy cảm', en:'Unhealthy for Sensitive Groups', color:'#ac5a26', headline:['Dành chút dịu dàng','cho lá phổi.'], message:'Nhóm nhạy cảm cần chú ý hơn.', advice:'Theo dõi chất lượng không khí trước khi lên kế hoạch vận động dài ngoài trời.', sensitive:'Trẻ em, người lớn tuổi, người có bệnh tim hoặc phổi nên giảm hoạt động kéo dài hay gắng sức ngoài trời.', scene:'Lớp mờ tăng, lá ngả màu trầm', pollutants:[46,74,44,29,1.1,10]},
  {id:3, value:176, min:151, max:200, label:'Có hại', en:'Unhealthy', color:'#b03933', headline:['Khép cửa khói bụi,','giữ một khoảng lành.'], message:'Không khí có thể ảnh hưởng mọi người.', advice:'Giảm hoạt động kéo dài hoặc gắng sức ngoài trời; chọn hoạt động nhẹ hơn trong nhà.', sensitive:'Nhóm nhạy cảm nên tránh vận động kéo dài hoặc gắng sức ngoài trời.', scene:'Trời xám, khói mờ, lá trầm và rũ', pollutants:[83,118,61,44,1.9,17]},
  {id:4, value:256, min:201, max:300, label:'Rất có hại', en:'Very Unhealthy', color:'#805182', headline:['Hôm nay, hãy thở','trong một nơi lành.'], message:'Nguy cơ sức khỏe tăng với mọi người.', advice:'Tránh hoạt động kéo dài hoặc gắng sức ngoài trời. Ưu tiên không gian trong nhà có không khí sạch.', sensitive:'Nhóm nhạy cảm nên tránh mọi hoạt động thể chất ngoài trời.', scene:'Khói xám dày, ánh sáng yếu, lá rũ', pollutants:[180,238,73,62,2.8,29]},
  {id:5, value:368, min:301, max:500, label:'Nguy hại', en:'Hazardous', color:'#7e3045', headline:['Ưu tiên an toàn,','ở nơi không khí sạch.'], message:'Cảnh báo sức khỏe ở mức nghiêm trọng.', advice:'Tránh mọi hoạt động thể chất ngoài trời. Theo dõi hướng dẫn từ cơ quan y tế địa phương.', sensitive:'Nhóm nhạy cảm nên ở trong nhà và giữ mức vận động thấp; tìm không gian có không khí sạch.', scene:'Khói phủ, bầu trời xám tối, cây thiếu sức sống', pollutants:[285,390,96,87,4.1,45]}
];

export function categoryFor(value) {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > 500) return null;
  return SCENARIOS.find(s=>value>=s.min && value<=s.max) ?? null;
}

// This is a small demo fixture, not an administrative directory or monitoring network.
export const LOCATIONS = [
  {id:'ben-thanh',name:'Bến Thành',area:'Khu vực trung tâm',aqi:42,x:44,y:60},
  {id:'sai-gon',name:'Sài Gòn',area:'Khu vực trung tâm',aqi:78,x:58,y:44},
  {id:'thao-dien',name:'Thảo Điền',area:'Khu vực phía Đông',aqi:64,x:79,y:26},
  {id:'tan-dinh',name:'Tân Định',area:'Khu vực trung tâm',aqi:112,x:35,y:25},
  {id:'binh-thanh',name:'Bình Thạnh',area:'Khu vực phía Bắc',aqi:95,x:61,y:15}
];

function normalize(text) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().trim(); }
export function searchLocations(query) {
  const term=normalize(query);
  return LOCATIONS.filter(p=>normalize(p.name+' '+p.area+' TP.HCM').includes(term));
}
export function makeHistory(current) {
  const offsets=[13,9,6,4,2,-2,-6,-10,-12,-9,-3,7,18,25,29,20,11,5,-1,-5,-8,-4,-2,0];
  return offsets.map((offset,i)=>({time:`${String((10+i)%24).padStart(2,'0')}:00`,value:Math.max(0,Math.min(500,current+offset))}));
}
