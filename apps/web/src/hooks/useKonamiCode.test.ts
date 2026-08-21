import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKonamiCode } from './useKonamiCode';

const KONAMI_KEYS = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

function pressKeys(keys: string[]) {
  for (const key of keys) {
    window.dispatchEvent(new KeyboardEvent('keydown', { key }));
  }
}

describe('useKonamiCode', () => {
  it('calls onActivate after the exact sequence', () => {
    const onActivate = vi.fn();
    renderHook(() => useKonamiCode(onActivate));

    pressKeys(KONAMI_KEYS);

    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  it('does not activate on a partial or wrong sequence', () => {
    const onActivate = vi.fn();
    renderHook(() => useKonamiCode(onActivate));

    pressKeys(['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown']);

    expect(onActivate).not.toHaveBeenCalled();
  });

  it('recovers after a wrong key and still detects the sequence starting over', () => {
    const onActivate = vi.fn();
    renderHook(() => useKonamiCode(onActivate));

    pressKeys(['ArrowUp', 'x']);
    pressKeys(KONAMI_KEYS);

    expect(onActivate).toHaveBeenCalledTimes(1);
  });
});
