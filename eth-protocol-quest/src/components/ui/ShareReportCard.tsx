import html2canvas from 'html2canvas';

export async function exportElementPng(elementId: string, filename: string) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const canvas = await html2canvas(el, { backgroundColor: null, scale: 2 });
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = filename;
  a.click();
}
