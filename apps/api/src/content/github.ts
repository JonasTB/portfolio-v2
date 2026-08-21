import type { GithubIntegration } from '@portfolio/contracts';

/**
 * Fallback estático — usado somente quando a API oficial do GitHub está
 * indisponível, expirou o rate limit ou o request excedeu o timeout.
 * Mantido curado à mão, não gerado, porque nesse cenário não há dado ao vivo.
 */
export const githubFallback: GithubIntegration = {
  profile: {
    login: 'JonasTB',
    name: 'Jonas Timbáuba',
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
