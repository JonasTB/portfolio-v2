import type { GithubIntegration } from '@portfolio/contracts';

/**
 * Cópia local do fallback (mesma fonte que apps/api/src/content/github.ts).
 * Usada como `initialData` da query — a seção de GitHub nunca fica em
 * branco, mesmo se a API estiver indisponível.
 */
export const githubFallback: GithubIntegration = {
  profile: {
    login: 'JonasTB',
    name: 'Jonas Timbaúba',
    avatarUrl: 'https://github.com/JonasTB.png',
    bio: null,
    url: 'https://github.com/JonasTB',
  },
  repositories: [
    {
      name: 'DDD-DRIZZLE-ORM',
      description: 'Repositório de referência do artigo sobre Drizzle ORM, NestJS e DDD.',
      url: 'https://github.com/JonasTB/DDD-DRIZZLE-ORM',
      homepage: null,
      language: 'TypeScript',
      stars: 0,
      topics: [],
      updatedAt: null,
    },
  ],
  topLanguages: ['TypeScript'],
};
