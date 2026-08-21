import { useLocale } from '../app/providers/useLocale';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../components/posts/PostCard';
import { Container, Heading, Section } from '../components/ui';

export function PostsPage() {
  const { t } = useLocale();
  const { data: posts } = usePosts();

  useDocumentHead({ title: 'Posts', description: t('posts.intro'), path: '/posts' });

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <Heading as="h1">Posts</Heading>
        <p className="mt-4 mb-12 text-lg text-text-secondary">{t('posts.intro')}</p>
        {posts.length === 0 ? (
          <p className="text-text-tertiary">{t('posts.empty')}</p>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
