import { useLocale } from '../app/providers/useLocale';
import { useProjects } from '../hooks/useProjects';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Container, Heading, Section } from '../components/ui';

export function ProjectsPage() {
  const { t } = useLocale();
  const { data: projects } = useProjects();
  useDocumentHead({ title: 'Projects', description: t('projects.intro'), path: '/projects' });

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <Heading as="h1">Projects</Heading>
        <p className="mt-4 mb-12 text-lg text-text-secondary">{t('projects.intro')}</p>
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
