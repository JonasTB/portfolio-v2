import { FlaskConical } from 'lucide-react';
import { useLocale } from '../../app/providers/useLocale';
import { Card } from '../ui';

export function LabEmptyState() {
  const { t } = useLocale();

  return (
    <Card className="border-dashed p-10 text-center">
      <FlaskConical className="mx-auto mb-4 text-text-tertiary" size={28} />
      <p className="mb-2 font-mono text-sm text-text-secondary">
        $ ls ./lab
        <span className="motion-safe:animate-pulse">_</span>
      </p>
      <p className="text-lg font-medium text-text">{t('lab.empty.title')}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-text-tertiary">
        {t('lab.empty.description')}
      </p>
    </Card>
  );
}
