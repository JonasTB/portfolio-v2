import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypePrettyCode, {
    theme: { light: 'github-light', dark: 'github-dark' },
    keepBackground: false,
  })
  .use(rehypeStringify);

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await processor.process(markdown);
  return String(result);
}
