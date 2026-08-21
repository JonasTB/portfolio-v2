import { Link as RouterLink, useParams } from 'react-router';
import { useLocale } from '../app/providers/useLocale';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { usePost } from '../hooks/usePost';
import { formatDate } from '../lib/formatDate';
import { ApiError } from '../lib/api';
import { PostContent } from '../components/posts/PostContent';
import { ArticleJsonLd } from '../components/seo/ArticleJsonLd';
import { Badge, Container, Heading, Link, Section } from '../components/ui';
import { NotFoundPage } from './NotFoundPage';

export function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLocale();
  const { data: post, isLoading, isError, error } = usePost(slug);

  useDocumentHead({
    title: post?.title ?? 'Posts',
    description: post?.description,
    path: slug ? `/posts/${slug}` : undefined,
    type: 'article',
  });

  if (isLoading) return null;

  if (isError) {
    if (error instanceof ApiError && error.status === 404) {
      return <NotFoundPage />;
    }
    return (
      <Section spacing="lg">
        <Container size="narrow">
          <p className="text-text-secondary">{t('posts.loadError')}</p>
        </Container>
      </Section>
    );
  }

  if (!post) return null;

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <ArticleJsonLd post={post} />
        <Link asChild variant="accent" className="mb-8 inline-block text-sm">
          <RouterLink to="/posts">← {t('posts.back')}</RouterLink>
        </Link>

        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-text-tertiary">
          <span>{formatDate(post.date, locale)}</span>
          <span>·</span>
          <span>
            {post.readingTime} {t('posts.readingTime')}
          </span>
        </div>
        <Heading as="h1">{post.title}</Heading>
        <p className="mt-4 max-w-lg text-lg text-text-secondary">{post.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="mt-12">
          <PostContent html={post.html} />
        </div>
      </Container>
    </Section>
  );
}
