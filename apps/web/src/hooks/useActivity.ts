import { useQuery } from '@tanstack/react-query';
import type { Activity } from '@portfolio/contracts';
import { apiGet } from '../lib/api';
import { activityFallback } from '../content/activityFallback';

export function useActivity() {
  return useQuery<Activity[]>({
    queryKey: ['activity'],
    queryFn: () => apiGet<Activity[]>('/activity'),
    initialData: activityFallback,
    initialDataUpdatedAt: 0,
  });
}
