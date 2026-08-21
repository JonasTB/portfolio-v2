import { useQuery } from '@tanstack/react-query';
import type { Experience } from '@portfolio/contracts';
import { apiGet } from '../lib/api';
import { experienceFallback } from '../content/experienceFallback';

export function useExperience() {
  return useQuery<Experience[]>({
    queryKey: ['experience'],
    queryFn: () => apiGet<Experience[]>('/experience'),
    initialData: experienceFallback,
    initialDataUpdatedAt: 0,
  });
}
