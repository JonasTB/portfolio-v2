import type { Locale } from '../app/providers/locale-context';

function formatMonth(yyyyMm: string, locale: Locale): string {
  const [year = 1970, month = 1] = yyyyMm.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return date.toLocaleDateString(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function formatPeriod(
  period: { start: string; end?: string },
  locale: Locale,
  presentLabel: string,
): string {
  const start = formatMonth(period.start, locale);
  const end = period.end ? formatMonth(period.end, locale) : presentLabel;
  return `${start} — ${end}`;
}
