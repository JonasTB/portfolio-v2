import { useQuery } from '@tanstack/react-query';
import type { LabExperiment } from '@portfolio/contracts';
import { apiGet } from '../lib/api';
import { labFallback } from '../content/labFallback';

export function useLab() {
  return useQuery<LabExperiment[]>({
    queryKey: ['lab'],
    queryFn: () => apiGet<LabExperiment[]>('/lab'),
    initialData: labFallback,
    initialDataUpdatedAt: 0,
  });
}
