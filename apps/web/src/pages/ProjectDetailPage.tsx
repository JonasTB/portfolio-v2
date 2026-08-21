import { Link as RouterLink, useParams } from 'react-router';
import { ExternalLink, GitFork } from 'lucide-react';
import { useLocale } from '../app/providers/useLocale';
import { useLocalizedText } from '../hooks/useLocalizedText';
import { useProject } from '../hooks/useProject';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { CaseStudySection } from '../components/projects/CaseStudySection';
import { CreativeWorkJsonLd } from '../components/seo/CreativeWorkJsonLd';
import { Badge, Container, Heading, Link, Section } from '../components/ui';
import { NotFoundPage } from './NotFoundPage';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLocale();
  const { data: project, isLoading } = useProject(slug);
  const description = useLocalizedText(project?.description ?? { 'pt-BR': '', 'en-US': '' });

  useDocumentHead({
    title: project?.title ?? 'Projects',
    description,
    path: slug ? `/projects/${slug}` : undefined,
  });

  if (!project) {
    return isLoading ? null : <NotFoundPage />;
  }

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <CreativeWorkJsonLd project={project} />
        <Link asChild variant="accent" className="mb-8 inline-block text-sm">
          <RouterLink to="/projects">← {t('projects.back')}</RouterLink>
        </Link>

        <p className="mb-3 font-mono text-xs text-text-tertiary">
          {project.year} · {t(`projects.status.${project.status}`)}
        </p>
        <Heading as="h1">{project.title}</Heading>

        <ProjectMeta project={project} />

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-5">
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

        {project.caseStudy && (
          <div className="mt-14">
            <CaseStudySection
              label={t('projects.caseStudy.problem')}
              content={project.caseStudy.problem}
            />
            <CaseStudySection
              label={t('projects.caseStudy.context')}
              content={project.caseStudy.context}
            />
            <CaseStudySection
              label={t('projects.caseStudy.solution')}
              content={project.caseStudy.solution}
            />
            <CaseStudySection
              label={t('projects.caseStudy.architecture')}
              content={project.caseStudy.architecture}
            />
            <CaseStudySection
              label={t('projects.caseStudy.decisions')}
              content={project.caseStudy.decisions}
            />
            <CaseStudySection
              label={t('projects.caseStudy.challenges')}
              content={project.caseStudy.challenges}
            />
            <CaseStudySection
              label={t('projects.caseStudy.outcome')}
              content={project.caseStudy.outcome}
            />
          </div>
        )}
      </Container>
    </Section>
  );
}

function ProjectMeta({ project }: { project: NonNullable<ReturnType<typeof useProject>['data']> }) {
  const { t } = useLocale();
  const role = useLocalizedText(project.role);
  const longDescription = useLocalizedText(project.longDescription ?? project.description);

  return (
    <>
      <p className="mt-4 max-w-lg text-lg text-text-secondary">{longDescription}</p>
      <p className="mt-3 text-sm text-text-tertiary">
        <span className="text-text-secondary">{t('projects.role')}:</span> {role}
      </p>
    </>
  );
}
