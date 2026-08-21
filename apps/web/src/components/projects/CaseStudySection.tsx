import type { LocalizedText } from '@portfolio/contracts';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { Heading } from '../ui';

export function CaseStudySection({ label, content }: { label: string; content?: LocalizedText }) {
  const text = useLocalizedText(content ?? { 'pt-BR': '', 'en-US': '' });
  if (!content) return null;

  return (
    <div className="border-t border-border py-8 first:border-t-0 first:pt-0">
      <Heading as="h2" size="h4" className="mb-3 text-text-tertiary uppercase">
        {label}
      </Heading>
      <p className="max-w-2xl text-base text-text-secondary">{text}</p>
    </div>
  );
}
