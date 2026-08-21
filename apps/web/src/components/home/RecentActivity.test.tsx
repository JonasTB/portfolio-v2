import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test/test-utils';
import { RecentActivity } from './RecentActivity';
import { activityFallback } from '../../content/activityFallback';

vi.mock('../../lib/api', async () => {
  const actual = await vi.importActual<typeof import('../../lib/api')>('../../lib/api');
  return { ...actual, apiGet: vi.fn().mockRejectedValue(new actual.ApiError(500, '/activity')) };
});

describe('RecentActivity (provider fallback)', () => {
  it('renders the local fallback events, linking to their real pages', () => {
    renderWithProviders(<RecentActivity />);

    const firstEvent = activityFallback[0]!;
    const link = screen.getByRole('link', { name: /portfolio pessoal/i });
    expect(link).toHaveAttribute('href', firstEvent.url);
  });
});
