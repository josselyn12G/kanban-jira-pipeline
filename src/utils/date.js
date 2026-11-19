/** Utilidades de fecha en hora local. Las fechas límite se guardan como 'YYYY-MM-DD'. */

const pad = (n) => String(n).padStart(2, '0');

export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseISODate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) return null;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.getMonth() === m - 1 ? date : null;
}

export function isOverdue(task, today = new Date()) {
  if (!task.dueDate || task.status === 'done') return false;
  return task.dueDate < toISODate(today);
}

/** Devuelve 42 fechas (6 semanas, lunes a domingo) que cubren el mes indicado. */
export function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // lunes = 0
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i));
}

export function formatMonthLabel(year, month, locale = 'es') {
  const label = new Date(year, month, 1).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatDueDate(value, locale = 'es') {
  const date = parseISODate(value);
  return date ? date.toLocaleDateString(locale, { day: 'numeric', month: 'short' }) : '';
}
