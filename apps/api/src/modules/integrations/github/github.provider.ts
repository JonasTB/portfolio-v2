import type { GithubProfile, GithubRepository } from '@portfolio/contracts';

export const GITHUB_PROVIDER = Symbol('GITHUB_PROVIDER');

export interface GithubProvider {
  getProfile(): Promise<GithubProfile>;
  getSelectedRepositories(): Promise<GithubRepository[]>;
}
