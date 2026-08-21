import type { Post } from '@portfolio/contracts';
import { JsonLd } from './JsonLd';

export function ArticleJsonLd({ post }: { post: Post }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: window.location.href,
        author: { '@type': 'Person', name: 'Jonas Timbáuba' },
        keywords: post.tags.join(', '),
      }}
    />
  );
}
