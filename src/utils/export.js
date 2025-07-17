import { saveAs } from 'file-saver';

export function exportCSV(rows, filename='expenses.csv') {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(','), ...rows.map(r=> headers.map(h=>JSON.stringify(r[h] ?? '')).join(','))].join('\n');
  saveAs(new Blob([csv], {type:'text/csv;charset=utf-8;'}), filename);
}

export function exportJSON(rows, filename='expenses.json') {
  if (!rows.length) return;
  saveAs(new Blob([JSON.stringify(rows, null, 2)], {type:'application/json;charset=utf-8;'}), filename);
}
