import { Link as RouterLink } from 'react-router';
import type { Project } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { useProjects } from '../../hooks/useProjects';
import { Badge, Card, Container, Heading, Link, Section } from '../ui';

function FeaturedProjectCard({ project }: { project: Project }) {
  const description = useLocalizedText(project.description);
  return (
    <RouterLink to={`/projects/${project.slug}`}>
      <Card hoverable>
        <div className="mb-3 flex items-center justify-between">
          <Heading as="h3" size="h4">
            {project.title}
          </Heading>
          <span className="font-mono text-xs text-text-tertiary">{project.year}</span>
        </div>
        <p className="mb-4 text-sm text-text-secondary">{description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </Card>
    </RouterLink>
  );
}

export function FeaturedProjects() {
  const { t } = useLocale();
  const { data: projects } = useProjects();
  const featured = projects.filter((project) => project.featured);

  if (featured.length === 0) return null;

  return (
    <Section>
      <Container size="wide">
        <div className="mb-8 flex items-center justify-between">
          <Heading as="h2">{t('home.featured.title')}</Heading>
          <Link asChild variant="accent">
            <RouterLink to="/projects">{t('home.featured.cta')}</RouterLink>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((project) => (
            <FeaturedProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
