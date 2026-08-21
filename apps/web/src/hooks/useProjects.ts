import { useQuery } from '@tanstack/react-query';
import type { Project } from '@portfolio/contracts';
import { apiGet } from '../lib/api';
import { projectsFallback } from '../content/projectsFallback';

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => apiGet<Project[]>('/projects'),
    initialData: projectsFallback,
    initialDataUpdatedAt: 0,
  });
}
