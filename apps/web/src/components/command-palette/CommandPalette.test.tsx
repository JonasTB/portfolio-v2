import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen } from '../../test/test-utils';
import { CommandPalette } from './CommandPalette';

vi.mock('../../lib/api', async () => {
  const actual = await vi.importActual<typeof import('../../lib/api')>('../../lib/api');
  return { ...actual, apiGet: vi.fn().mockRejectedValue(new actual.ApiError(500, '/profile')) };
});

const navigateMock = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return { ...actual, useNavigate: () => navigateMock };
});

describe('CommandPalette', () => {
  beforeEach(() => {
    navigateMock.mockClear();
    document.documentElement.classList.remove('dark');
  });

  it('opens on trigger click and navigates when a command is chosen', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommandPalette />);

    await user.click(screen.getByRole('button', { name: /command palette/i }));
    await user.click(await screen.findByRole('button', { name: 'Go to Projects' }));

    expect(navigateMock).toHaveBeenCalledWith('/projects');
  });

  it('hides the secret "Join the dark side" command until it is searched for', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommandPalette />);

    await user.click(screen.getByRole('button', { name: /command palette/i }));
    expect(screen.queryByText('Join the dark side')).not.toBeInTheDocument();

    await user.type(screen.getByPlaceholderText(/comando/i), 'dark side');
    const secretCommand = await screen.findByRole('button', { name: 'Join the dark side' });
    expect(secretCommand).toBeInTheDocument();

    await user.click(secretCommand);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
