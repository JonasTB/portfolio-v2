import { useQuery } from '@tanstack/react-query';
import type { Post } from '@portfolio/contracts';
import { apiGet } from '../lib/api';

/**
 * Sem fallback local: o HTML é processado só no servidor (ver
 * content/postsFallback.ts). Se a API estiver fora do ar, a página trata o
 * estado de loading/erro normalmente em vez de mostrar conteúdo duplicado.
 */
export function usePost(slug: string | undefined) {
  return useQuery<Post>({
    queryKey: ['post', slug],
    queryFn: () => apiGet<Post>(`/posts/${slug}`),
    enabled: Boolean(slug),
    retry: false,
  });
}
