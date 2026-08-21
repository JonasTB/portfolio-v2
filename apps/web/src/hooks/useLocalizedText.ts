import type { LocalizedText } from '@portfolio/contracts';
import { useLocale } from '../app/providers/useLocale';

export function useLocalizedText(value: LocalizedText): string {
  const { locale } = useLocale();
  return value[locale];
}
