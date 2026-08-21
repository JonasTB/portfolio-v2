import { useEffect } from 'react';

interface DocumentHeadOptions {
  title: string;
  description?: string;
  /** Caminho absoluto (ex.: "/projects/portfolio"). Por padrão usa a URL atual. */
  path?: string;
  type?: 'website' | 'article';
  /** Marca a página como não-indexável (ex.: página interna de validação). */
  noindex?: boolean;
  /** Usa `title` como o `<title>` completo, sem anexar "— Jonas Timbaúba" (ex.: Home). */
  raw?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Define title/description/OG/canonical por página — SPA sem SSR, roda no client. */
export function useDocumentHead({
  title,
  description,
  path,
  type = 'website',
  noindex = false,
  raw = false,
}: DocumentHeadOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    const fullTitle = raw ? title : `${title} — Jonas Timbaúba`;
    document.title = fullTitle;

    const url = `${window.location.origin}${path ?? window.location.pathname}`;

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertLink('canonical', url);

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, path, type, noindex, raw]);
}
