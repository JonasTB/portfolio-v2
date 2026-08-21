import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test/test-utils';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders the not-found message and a link back home', () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
  });

  it('marks the page as noindex', () => {
    renderWithProviders(<NotFoundPage />);

    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
  });
});
