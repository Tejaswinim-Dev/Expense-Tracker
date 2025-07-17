import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportPDF() {
  const area = document.getElementById('export-area');
  if (!area) {
    alert('Nothing to export');
    return;
  }
  const originalScroll = area.scrollTop;
  area.scrollTop = 0;

  const canvas = await html2canvas(area, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  while (heightLeft > 0) {
    pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;
    if (heightLeft > 0) {
      position = -heightLeft;
      pdf.addPage();
    }
  }
  pdf.save('expenses.pdf');
  area.scrollTop = originalScroll;
}
