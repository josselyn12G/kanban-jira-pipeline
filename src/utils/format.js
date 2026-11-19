export function formatShortDate(iso, locale = 'es') {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
}

export function percentage(part, total) {
  return total ? Math.round((part / total) * 100) : 0;
}
