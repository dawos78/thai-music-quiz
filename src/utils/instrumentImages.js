// Instrument images from local /instruments/ directory
// Maps Thai instrument names to local image files

const instrumentImageMap = {
  // ปี่ (Oboes)
  'ปี่ใน': '/instruments/pi-nai.png',
  'ปี่นอก': '/instruments/pi-nok.png',
  'ปี่ชวา': '/instruments/pi-chawa.png',
  'ปี่มอญ': '/instruments/pi-mon.png',

  // ระนาด (Xylophones)
  'ระนาดเอก': '/instruments/ranad-ek.png',
  'ระนาดเอก (ไม้นวม)': '/instruments/ranad-ek.png',
  'ระนาดเอก (มโหรี)': '/instruments/ranad-ek.png',
  'ระนาดทุ้ม': '/instruments/ranad-thum.png',
  'ระนาดทุ้ม (มโหรี)': '/instruments/ranad-thum.png',
  'ระนาดเอกเหล็ก': '/instruments/ranad-ek-lek.png',
  'ระนาดเอกเหล็ก (มโหรี)': '/instruments/ranad-ek-lek.png',
  'ระนาดทุ้มเหล็ก': '/instruments/ranad-thum-lek.png',
  'ระนาดทุ้มเหล็ก (มโหรี)': '/instruments/ranad-thum-lek.png',

  // ฆ้อง (Gongs)
  'ฆ้องวงใหญ่': '/instruments/khong-wong-yai.png',
  'ฆ้องวงใหญ่ (มโหรี)': '/instruments/khong-wong-yai.png',
  'ฆ้องวงเล็ก': '/instruments/khong-wong-lek.png',
  'ฆ้องวงเล็ก (มโหรี)': '/instruments/khong-wong-lek.png',
  'ฆ้องมอญวงใหญ่': '/instruments/khong-mon-yai.png',
  'ฆ้องมอญวงเล็ก': '/instruments/khong-mon-lek.png',
  'ฆ้องคู่': '/instruments/khong-khu.png',
  'ฆ้องหุ่ย': '/instruments/khong-rao.png',
  'ฆ้องราว 3 ใบ': '/instruments/khong-rao.png',

  // กลอง / ตะโพน (Drums)
  'ตะโพน': '/instruments/taphon.png',
  'ตะโพนมอญ': '/instruments/taphon-mon.png',
  'ตะโพนไทย': '/instruments/taphon.png',
  'กลองทัด': '/instruments/klong-thad.png',
  'กลองทัด 1 ลูก': '/instruments/klong-thad-1.png',
  'กลองทัด 2 ลูก': '/instruments/klong-thad-2.png',
  'กลองชาตรี': '/instruments/klong-chatri.png',
  'กลองมลายู': '/instruments/klong-malayu.png',
  'กลองแขก': '/instruments/klong-khaek.png',
  'กลองสองหน้า': '/instruments/klong-song-na.png',
  'กลองตะโพน': '/instruments/taphon.png',

  // เครื่องจังหวะ (Rhythm)
  'ฉิ่ง': '/instruments/ching.png',
  'ฉาบ': '/instruments/chap-yai.png',
  'ฉาบเล็ก': '/instruments/chap-lek.png',
  'ฉาบใหญ่': '/instruments/chap-yai.png',
  'โหม่ง': '/instruments/mong.png',
  'โหม่งราว': '/instruments/mong-rao.png',
  'กรับ': '/instruments/krap-sepha.png',
  'กรับเสภา': '/instruments/krap-sepha.png',
  'กรับพวง': '/instruments/krap-phuang.png',

  // โทน-รำมะนา (Goblet + Frame drums)
  'โทน-รำมะนา': '/instruments/thon-rammana.png',
  'โทน': '/instruments/thon-rammana.png',
  'โทน (ทับ)': '/instruments/thap.png',
  'ทับ': '/instruments/thap.png',
  'โทนชาตรี': '/instruments/thon-chatri.png',
  'รำมะนา': '/instruments/thon-rammana.png',
  'เปิงมางคอก': '/instruments/poeng-mang-khok.png',

  // เครื่องสี (Bowed strings)
  'ซอด้วง': '/instruments/saw-duang.png',
  'ซออู้': '/instruments/saw-u.png',
  'ซอสามสาย': '/instruments/saw-sam-sai.png',
  'ซอสามสายหลิบ': '/instruments/saw-sam-sai.png',

  // เครื่องดีด (Plucked strings)
  'จะเข้': '/instruments/jakhe.png',
  'กระจับปี่': '/instruments/krajappi.png',

  // ขลุ่ย (Flutes)
  'ขลุ่ยเพียงออ': '/instruments/khlui-phiang-aw.png',
  'ขลุ่ยหลิบ': '/instruments/khlui-lip.png',
  'ขลุ่ยอู้': '/instruments/khlui.png',

  // ขิม (Hammered dulcimer)
  'ขิม': '/instruments/khim.png',
};

// Instrument type config
const instrumentTypeConfig = {
  'เป่า': { emoji: '🎺', color: '#F59E0B', label: 'เครื่องเป่า' },
  'ตี': { emoji: '🥁', color: '#EF4444', label: 'เครื่องตี' },
  'สี': { emoji: '🎻', color: '#8B5CF6', label: 'เครื่องสี' },
  'ดีด': { emoji: '🪕', color: '#10B981', label: 'เครื่องดีด' },
};

export function getInstrumentImage(name) {
  return instrumentImageMap[name] || null;
}

export function getTypeConfig(type) {
  return instrumentTypeConfig[type] || { emoji: '🎵', color: '#C9A747', label: type };
}

export function getTypeEmoji(type) {
  return (instrumentTypeConfig[type] || {}).emoji || '🎵';
}

export function getTypeLabel(type) {
  return (instrumentTypeConfig[type] || {}).label || type;
}

export function getTypeColor(type) {
  return (instrumentTypeConfig[type] || {}).color || '#C9A747';
}
