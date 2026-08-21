import { Inject, Injectable, Logger } from '@nestjs/common';
import type { GithubIntegration } from '@portfolio/contracts';
import { githubFallback } from '../../../content/github.js';
import { GITHUB_PROVIDER, type GithubProvider } from './github.provider.js';

const CACHE_TTL_MS = 20 * 60 * 1000;
const FAILURE_COOLDOWN_MS = 60 * 1000;

interface CacheEntry {
  data: GithubIntegration;
  expiresAt: number;
}

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private cache: CacheEntry | null = null;
  private lastFailureAt: number | null = null;

  constructor(@Inject(GITHUB_PROVIDER) private readonly provider: GithubProvider) {}

  async getIntegration(): Promise<GithubIntegration> {
    const now = Date.now();

    if (this.cache && this.cache.expiresAt > now) {
      return this.cache.data;
    }

    if (this.lastFailureAt && now - this.lastFailureAt < FAILURE_COOLDOWN_MS) {
      return this.cache?.data ?? githubFallback;
    }

    try {
      const [profile, repositories] = await Promise.all([
        this.provider.getProfile(),
        this.provider.getSelectedRepositories(),
      ]);
      const data: GithubIntegration = {
        profile,
        repositories,
        topLanguages: deriveTopLanguages(repositories.map((repo) => repo.language)),
      };
      this.cache = { data, expiresAt: now + CACHE_TTL_MS };
      this.lastFailureAt = null;
      return data;
    } catch (error) {
      this.lastFailureAt = now;
      const message = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Falha ao buscar dados do GitHub, usando fallback: ${message}`);
      return this.cache?.data ?? githubFallback;
    }
  }
}

function deriveTopLanguages(languages: (string | null)[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const language of languages) {
    if (language && !seen.has(language)) {
      seen.add(language);
      result.push(language);
    }
  }
  return result;
}
