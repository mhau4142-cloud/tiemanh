// Nhãn hiển thị tiếng Việt cho tag blog (slug không dấu để URL sạch)
export const tagLabels: Record<string, string> = {
  "ky-yeu": "Kỷ yếu",
  "chan-dung": "Chân dung",
  "da-ngoai": "Dã ngoại",
  "kinh-nghiem": "Kinh nghiệm",
  "dia-diem": "Địa điểm",
};

export const tagLabel = (tag: string) => tagLabels[tag] ?? tag;
