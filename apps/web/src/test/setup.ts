import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// RTL só auto-registra o cleanup entre testes quando `afterEach` é global —
// como os testes deste projeto importam explicitamente do vitest (sem
// `test.globals`), o cleanup precisa ser conectado à mão.
afterEach(cleanup);

// Fixa o idioma detectado em pt-BR — sem isso, o jsdom relata "en-US" e
// LocaleProvider resolve para inglês, quebrando asserts escritos em pt-BR.
Object.defineProperty(window.navigator, 'language', {
  value: 'pt-BR',
  configurable: true,
});

// jsdom não implementa matchMedia — ThemeProvider e componentes com
// prefers-reduced-motion/prefers-color-scheme dependem dele.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}
