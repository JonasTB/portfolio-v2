import { useQuery } from '@tanstack/react-query';
import type { Profile } from '@portfolio/contracts';
import { apiGet } from '../lib/api';
import { profileFallback } from '../content/profileFallback';

export function useProfile() {
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: () => apiGet<Profile>('/profile'),
    initialData: profileFallback,
    initialDataUpdatedAt: 0,
  });
}
