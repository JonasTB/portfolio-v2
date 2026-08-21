import type { Project } from '@portfolio/contracts';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { JsonLd } from './JsonLd';

export function CreativeWorkJsonLd({ project }: { project: Project }) {
  const description = useLocalizedText(project.description);

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description,
        url: window.location.href,
        dateCreated: project.publishedAt,
        ...(project.repository ? { codeRepository: project.repository } : {}),
      }}
    />
  );
}
