import { GithubService } from './github.service.js';
import type { GithubProvider } from './github.provider.js';
import { githubFallback } from '../../../content/github.js';

function buildProvider(overrides: Partial<GithubProvider> = {}) {
  const getProfile = overrides.getProfile ?? jest.fn().mockResolvedValue(githubFallback.profile);
  const getSelectedRepositories =
    overrides.getSelectedRepositories ?? jest.fn().mockResolvedValue(githubFallback.repositories);
  const provider: GithubProvider = { getProfile, getSelectedRepositories };
  return { provider, getProfile, getSelectedRepositories };
}

describe('GithubService', () => {
  it('returns live data from the provider on success', async () => {
    const { provider, getProfile } = buildProvider();
    const service = new GithubService(provider);

    const result = await service.getIntegration();

    expect(result.profile).toEqual(githubFallback.profile);
    expect(getProfile).toHaveBeenCalledTimes(1);
  });

  it('falls back to local content when the provider fails and there is no cache yet', async () => {
    const { provider } = buildProvider({
      getProfile: jest.fn().mockRejectedValue(new Error('GitHub API indisponível')),
    });
    const service = new GithubService(provider);

    const result = await service.getIntegration();

    expect(result).toEqual(githubFallback);
  });

  it('serves cached data without calling the provider again within the TTL', async () => {
    const { provider, getProfile } = buildProvider();
    const service = new GithubService(provider);

    await service.getIntegration();
    await service.getIntegration();

    expect(getProfile).toHaveBeenCalledTimes(1);
  });

  it('does not retry the provider during the failure cooldown, reusing the fallback', async () => {
    const { provider, getProfile } = buildProvider({
      getProfile: jest.fn().mockRejectedValue(new Error('GitHub API indisponível')),
    });
    const service = new GithubService(provider);

    const first = await service.getIntegration();
    const second = await service.getIntegration();

    expect(getProfile).toHaveBeenCalledTimes(1);
    expect(second).toEqual(first);
  });
});
