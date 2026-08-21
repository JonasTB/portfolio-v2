import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { GithubProfile, GithubRepository } from '@portfolio/contracts';
import type { GithubProvider } from './github.provider.js';

const GITHUB_API_URL = 'https://api.github.com';
const REQUEST_TIMEOUT_MS = 5000;
const SELECTED_REPOSITORIES_LIMIT = 6;

interface GithubApiUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
}

interface GithubApiRepository {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  updated_at: string | null;
  fork: boolean;
  archived: boolean;
}

@Injectable()
export class GithubApiProvider implements GithubProvider {
  constructor(private readonly config: ConfigService) {}

  private get username(): string {
    const username = this.config.get<string>('GITHUB_USERNAME');
    if (!username) {
      throw new Error('GITHUB_USERNAME não configurado');
    }
    return username;
  }

  private async request<T>(path: string): Promise<T> {
    const token = this.config.get<string>('GITHUB_TOKEN');
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${GITHUB_API_URL}${path}`, {
      headers,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`GitHub API respondeu ${response.status} em ${path}`);
    }

    return response.json() as Promise<T>;
  }

  async getProfile(): Promise<GithubProfile> {
    const user = await this.request<GithubApiUser>(`/users/${this.username}`);
    return {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      url: user.html_url,
    };
  }

  async getSelectedRepositories(): Promise<GithubRepository[]> {
    const repos = await this.request<GithubApiRepository[]>(
      `/users/${this.username}/repos?per_page=100&sort=updated`,
    );

    return repos
      .filter((repo) => !repo.fork && !repo.archived)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return (b.updated_at ?? '').localeCompare(a.updated_at ?? '');
      })
      .slice(0, SELECTED_REPOSITORIES_LIMIT)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics ?? [],
        updatedAt: repo.updated_at,
      }));
  }
}
