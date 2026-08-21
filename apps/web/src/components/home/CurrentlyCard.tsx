import type { LocalizedText, Profile } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { Card } from '../ui';

function CurrentlyRow({ label, value }: { label: string; value: LocalizedText }) {
  const text = useLocalizedText(value);
  return (
    <p className="font-mono text-sm text-text-secondary">
      <span className="text-accent">{label}:</span> {text}
    </p>
  );
}

export function CurrentlyCard({ currently }: { currently: Profile['currently'] }) {
  const { t } = useLocale();
  const entries: { label: string; value: LocalizedText }[] = [];
  if (currently.building) entries.push({ label: 'building', value: currently.building });
  if (currently.learning) entries.push({ label: 'learning', value: currently.learning });
  if (currently.exploring) entries.push({ label: 'exploring', value: currently.exploring });

  if (entries.length === 0) return null;

  return (
    <Card className="w-full max-w-xs sm:max-w-sm">
      <p className="mb-3 font-mono text-xs text-text-tertiary">
        $ {t('home.currently.title')}
        <span className="motion-safe:animate-pulse">_</span>
      </p>
      <div className="flex flex-col gap-1.5">
        {entries.map((entry) => (
          <CurrentlyRow key={entry.label} label={entry.label} value={entry.value} />
        ))}
      </div>
    </Card>
  );
}
