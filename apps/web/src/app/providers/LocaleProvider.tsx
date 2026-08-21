import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { LocaleContext, dictionaries } from './locale-context';
import type { Locale } from './locale-context';

const STORAGE_KEY = 'portfolio-locale';

function readStoredLocale(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'pt-BR' || stored === 'en-US') return stored;
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en-US';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  // `<html lang>` (SEO/a11y): sincroniza também no mount, não só na troca —
  // o valor estático "pt-BR" do index.html pode divergir do idioma detectado.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback((key: string) => dictionaries[locale][key] ?? key, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
