import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test/test-utils';
import { GithubHighlights } from './GithubHighlights';
import { githubFallback } from '../../content/githubFallback';

vi.mock('../../lib/api', async () => {
  const actual = await vi.importActual<typeof import('../../lib/api')>('../../lib/api');
  return {
    ...actual,
    // Simula a API indisponível — o componente deve continuar mostrando o fallback local.
    apiGet: vi.fn().mockRejectedValue(new actual.ApiError(500, '/integrations/github')),
  };
});

describe('GithubHighlights (provider fallback)', () => {
  it('renders the local fallback content when the API is unreachable', () => {
    renderWithProviders(<GithubHighlights />);

    expect(screen.getByText(githubFallback.repositories[0]!.name)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver perfil completo/i })).toHaveAttribute(
      'href',
      githubFallback.profile.url,
    );
  });
});
