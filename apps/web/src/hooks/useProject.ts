import { useQuery } from '@tanstack/react-query';
import type { Project } from '@portfolio/contracts';
import { apiGet } from '../lib/api';
import { projectsFallback } from '../content/projectsFallback';

export function useProject(slug: string | undefined) {
  const fallback = projectsFallback.find((project) => project.slug === slug);

  return useQuery<Project>({
    queryKey: ['project', slug],
    queryFn: () => apiGet<Project>(`/projects/${slug}`),
    initialData: fallback,
    initialDataUpdatedAt: fallback ? 0 : undefined,
    enabled: Boolean(slug),
  });
}
