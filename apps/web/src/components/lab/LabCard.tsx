import { Archive, CheckCircle2, ExternalLink, GitFork, Lightbulb, Loader } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { LabExperiment } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { formatDate } from '../../lib/formatDate';
import { Badge, Card, Heading, Link } from '../ui';

const statusIcons: Record<LabExperiment['status'], LucideIcon> = {
  idea: Lightbulb,
  'in-progress': Loader,
  shipped: CheckCircle2,
  abandoned: Archive,
};

export function LabCard({ experiment }: { experiment: LabExperiment }) {
  const { locale, t } = useLocale();
  const description = useLocalizedText(experiment.description);
  const StatusIcon = statusIcons[experiment.status];

  return (
    <Card className="border-dashed p-6">
      <div className="mb-3 flex items-center gap-2 font-mono text-xs text-text-tertiary">
        <StatusIcon
          size={13}
          className={experiment.status === 'in-progress' ? 'motion-safe:animate-spin' : ''}
        />
        <span>{t(`lab.status.${experiment.status}`)}</span>
        <span>·</span>
        <span>
          {t('lab.updatedAt')} {formatDate(experiment.updatedAt, locale)}
        </span>
      </div>

      <Heading as="h3" size="h4" className="mb-2">
        {experiment.title}
      </Heading>
      <p className="mb-4 text-sm text-text-secondary">{description}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {experiment.technologies.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {experiment.repository && (
          <Link href={experiment.repository} target="_blank" rel="noreferrer">
            <span className="inline-flex items-center gap-1.5 text-sm">
              <GitFork size={14} />
              {t('projects.repo')}
            </span>
          </Link>
        )}
        {experiment.link && (
          <Link href={experiment.link} target="_blank" rel="noreferrer">
            <span className="inline-flex items-center gap-1.5 text-sm">
              <ExternalLink size={14} />
              {t('projects.website')}
            </span>
          </Link>
        )}
      </div>
    </Card>
  );
}
