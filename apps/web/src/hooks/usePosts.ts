import { useQuery } from '@tanstack/react-query';
import type { PostListItem } from '@portfolio/contracts';
import { apiGet } from '../lib/api';
import { postsFallback } from '../content/postsFallback';

export function usePosts() {
  return useQuery<PostListItem[]>({
    queryKey: ['posts'],
    queryFn: () => apiGet<PostListItem[]>('/posts'),
    initialData: postsFallback,
    initialDataUpdatedAt: 0,
  });
}
