import { useMemo } from 'react';
import DOMPurify from 'dompurify';

export function PostContent({ html }: { html: string }) {
  const safeHtml = useMemo(() => DOMPurify.sanitize(html), [html]);

  return <div className="post-content" dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
