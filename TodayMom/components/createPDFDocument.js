import { jsPDF } from 'jspdf';

// PDF 생성 함수
const createPDFDocument = (data) => {
  const doc = new jsPDF();
  const headers = [
    '연도',
    '월',
    '일',
    '수면 시간',
    '홍조 여부',
    '두통 여부',
    '복통 여부',
    '변비 여부',
    '근육통 여부',
    '피부 문제',
    '감각 이상',
    '오한',
    '우울증',
    '기록',
  ];

  // 제목과 헤더 추가
  doc.setFontSize(18);
  doc.text('건강 기록', 14, 22);
  doc.setFontSize(12);
  headers.forEach((header, index) => {
    doc.text(header, 14 + index * 12, 40);
  });

  // 데이터 추가
  data.forEach((item, index) => {
    const startY = 50 + index * 10;
    doc.text(item.year.toString(), 14, startY);
    doc.text(item.month.toString(), 26, startY);
    doc.text(item.day.toString(), 38, startY);
    doc.text(item.sleepTime, 50, startY);
    doc.text(item.isBlushing ? '예' : '아니오', 62, startY);
    doc.text(item.isHeadache ? '예' : '아니오', 74, startY);
    doc.text(item.isStomachache ? '예' : '아니오', 86, startY);
    doc.text(item.isConstipated ? '예' : '아니오', 98, startY);
    doc.text(item.isMusclePainful ? '예' : '아니오', 110, startY);
    doc.text(item.isSkinTroubled ? '예' : '아니오', 122, startY);
    doc.text(item.isNumbness ? '예' : '아니오', 134, startY);
    doc.text(item.isChilled ? '예' : '아니오', 146, startY);
    doc.text(item.isDepressed ? '예' : '아니오', 158, startY);
    doc.text(item.record, 170, startY, { maxWidth: 180 });
  });

  // Base64 인코딩된 PDF 데이터 반환
  return doc.output('datauristring');
};

export { createPDFDocument };
