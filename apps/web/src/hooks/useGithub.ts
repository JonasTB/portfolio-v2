import { useQuery } from '@tanstack/react-query';
import type { GithubIntegration } from '@portfolio/contracts';
import { apiGet } from '../lib/api';
import { githubFallback } from '../content/githubFallback';

export function useGithub() {
  return useQuery<GithubIntegration>({
    queryKey: ['github'],
    queryFn: () => apiGet<GithubIntegration>('/integrations/github'),
    initialData: githubFallback,
    initialDataUpdatedAt: 0,
  });
}
