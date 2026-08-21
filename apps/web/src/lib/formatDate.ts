import type { Locale } from '../app/providers/locale-context';

export function formatDate(isoDate: string, locale: Locale): string {
  return new Date(isoDate).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
