import type { Activity } from '@portfolio/contracts';

/**
 * Cópia local só das fontes sempre-locais (posts, projects) — mesmos ids e
 * textos que `ActivityService` geraria a partir de `postsFallback`/
 * `projectsFallback`. GitHub/LinkedIn ficam de fora do fallback: são fontes
 * condicionais, e não há graça em duplicar a lógica de derivação aqui.
 */
export const activityFallback: Activity[] = [
  {
    id: 'projects-portfolio',
    type: 'project_updated',
    source: 'projects',
    title: {
      'pt-BR': 'Projeto atualizado: Portfolio pessoal',
      'en-US': 'Project updated: Portfolio pessoal',
    },
    url: '/projects/portfolio',
    createdAt: '2026-08-20',
  },
  {
    id: 'posts-drizzle-orm-nestjs-ddd',
    type: 'post_published',
    source: 'posts',
    title: {
      'pt-BR': 'Novo post: Minha experiência com Drizzle ORM: por que essa ORM me conquistou',
      'en-US': 'New post: Minha experiência com Drizzle ORM: por que essa ORM me conquistou',
    },
    url: '/posts/drizzle-orm-nestjs-ddd',
    createdAt: '2026-08-20',
  },
];
