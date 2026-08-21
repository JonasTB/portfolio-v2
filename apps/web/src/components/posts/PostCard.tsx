import { Link as RouterLink } from 'react-router';
import type { PostListItem } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { formatDate } from '../../lib/formatDate';
import { Badge, Card, Heading } from '../ui';

export function PostCard({ post }: { post: PostListItem }) {
  const { locale, t } = useLocale();

  return (
    <RouterLink to={`/posts/${post.slug}`}>
      <Card hoverable className="p-8">
        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-text-tertiary">
          <span>{formatDate(post.date, locale)}</span>
          <span>·</span>
          <span>
            {post.readingTime} {t('posts.readingTime')}
          </span>
          {post.locale !== locale && (
            <>
              <span>·</span>
              <span className="uppercase">{post.locale}</span>
            </>
          )}
        </div>
        <Heading as="h2" size="h3" className="mb-2">
          {post.title}
        </Heading>
        <p className="mb-4 max-w-2xl text-base text-text-secondary">{post.description}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </Card>
    </RouterLink>
  );
}
