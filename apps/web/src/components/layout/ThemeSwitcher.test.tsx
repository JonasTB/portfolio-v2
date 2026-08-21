import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen } from '../../test/test-utils';
import { ThemeSwitcher } from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('cycles system → light → dark → system, applying the .dark class and persisting to localStorage', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeSwitcher />);

    const button = screen.getByRole('button', { name: /tema: sistema/i });
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    await user.click(button);
    expect(await screen.findByRole('button', { name: /tema: claro/i })).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem('portfolio-theme')).toBe('light');

    await user.click(screen.getByRole('button', { name: /tema: claro/i }));
    expect(await screen.findByRole('button', { name: /tema: escuro/i })).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark');

    await user.click(screen.getByRole('button', { name: /tema: escuro/i }));
    expect(await screen.findByRole('button', { name: /tema: sistema/i })).toBeInTheDocument();
    expect(window.localStorage.getItem('portfolio-theme')).toBeNull();
  });
});
