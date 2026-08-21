import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDocumentHead } from './useDocumentHead';

describe('useDocumentHead', () => {
  it('sets title, description, canonical and OG tags', () => {
    renderHook(() =>
      useDocumentHead({ title: 'Projects', description: 'Meus projetos', path: '/projects' }),
    );

    expect(document.title).toBe('Projects — Jonas Timbaúba');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Meus projetos',
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      expect.stringContaining('/projects'),
    );
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index, follow',
    );
  });

  it('uses the raw title without the site suffix when raw is true', () => {
    renderHook(() => useDocumentHead({ title: 'Jonas Timbaúba — Engineer', raw: true }));

    expect(document.title).toBe('Jonas Timbaúba — Engineer');
  });

  it('marks noindex pages accordingly', () => {
    renderHook(() => useDocumentHead({ title: 'Not Found', noindex: true }));

    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
  });
});
