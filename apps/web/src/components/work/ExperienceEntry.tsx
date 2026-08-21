import type { Experience } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { formatPeriod } from '../../lib/formatPeriod';
import { Badge, Heading } from '../ui';

export function ExperienceEntry({ experience }: { experience: Experience }) {
  const { locale, t } = useLocale();
  const role = useLocalizedText(experience.role);
  const context = useLocalizedText(experience.context);
  const period = formatPeriod(experience.period, locale, t('work.present'));

  return (
    <div className="border-l border-border py-6 pl-6">
      <Heading as="h3" size="h4" className="mb-1">
        {role}
      </Heading>
      <p className="mb-1 font-mono text-xs text-text-tertiary">
        {period}
        {experience.location ? ` · ${experience.location}` : ''}
      </p>
      <p className="mb-3 text-sm text-text-secondary">{context}</p>
      <ul className="mb-3 flex flex-col gap-1">
        {experience.impact.map((line, index) => (
          <ImpactLine key={index} line={line} />
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </div>
  );
}

function ImpactLine({ line }: { line: Experience['impact'][number] }) {
  const text = useLocalizedText(line);
  return (
    <li className="flex gap-2 text-sm text-text-secondary">
      <span className="text-accent">—</span>
      <span>{text}</span>
    </li>
  );
}
