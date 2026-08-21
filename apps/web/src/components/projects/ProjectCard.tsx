import { Link as RouterLink } from 'react-router';
import { ExternalLink, GitFork } from 'lucide-react';
import type { Project } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { Badge, Card, Heading, Link } from '../ui';

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLocale();
  const description = useLocalizedText(project.description);

  return (
    <Card hoverable className="p-8">
      <div className="mb-3 flex items-center gap-2 text-xs text-text-tertiary">
        <span className="font-mono">{project.year}</span>
        <span>·</span>
        <Badge>{t(`projects.status.${project.status}`)}</Badge>
      </div>

      <RouterLink to={`/projects/${project.slug}`} className="group">
        <Heading
          as="h2"
          size="h3"
          className="mb-2 transition-colors duration-150 ease-signature group-hover:text-accent"
        >
          {project.title}
        </Heading>
      </RouterLink>

      <p className="mb-5 max-w-2xl text-base text-text-secondary">{description}</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <RouterLink
          to={`/projects/${project.slug}`}
          className="text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-150 ease-signature hover:decoration-accent"
        >
          {project.caseStudy ? t('projects.caseStudy') : t('projects.viewDetails')}
        </RouterLink>
        {project.repository && (
          <Link href={project.repository} target="_blank" rel="noreferrer">
            <span className="inline-flex items-center gap-1.5 text-sm">
              <GitFork size={14} />
              {t('projects.repo')}
            </span>
          </Link>
        )}
        {project.website && (
          <Link href={project.website} target="_blank" rel="noreferrer">
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
