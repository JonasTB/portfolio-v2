import type { PostListItem } from '@portfolio/contracts';

/**
 * Cópia local só da metadata dos posts (mesma fonte que
 * apps/api/src/content/posts/*.md) — usada como `initialData` da listagem.
 * O corpo em HTML não é duplicado aqui: por decisão de arquitetura, o
 * Markdown só é processado no servidor (ver docs/architecture.md), então
 * a página de post individual não tem fallback local, apenas loading/erro.
 */
export const postsFallback: PostListItem[] = [
  {
    slug: 'drizzle-orm-nestjs-ddd',
    locale: 'pt-BR',
    title: 'Minha experiência com Drizzle ORM: por que essa ORM me conquistou',
    description:
      'Depois de finalizar um projeto completo com Drizzle ORM, NestJS e DDD, compartilho por que essa ferramenta me chamou tanto a atenção.',
    date: '2026-08-20',
    tags: [
      'Drizzle ORM',
      'TypeScript',
      'NestJS',
      'DDD',
      'PostgreSQL',
      'Backend',
      'ORM',
      'Performance',
    ],
    readingTime: 2,
  },
];
