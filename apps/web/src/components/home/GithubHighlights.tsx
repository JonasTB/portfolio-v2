import { Star } from 'lucide-react';
import type { GithubRepository } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { useGithub } from '../../hooks/useGithub';
import { Avatar, Card, Container, Heading, Link, Section } from '../ui';

function RepositoryCard({ repository }: { repository: GithubRepository }) {
  return (
    <Link href={repository.url} target="_blank" rel="noreferrer" className="no-underline">
      <Card hoverable className="h-full">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Heading as="h3" size="h4" className="truncate">
            {repository.name}
          </Heading>
          {repository.stars > 0 && (
            <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-text-tertiary">
              <Star size={12} /> {repository.stars}
            </span>
          )}
        </div>
        {repository.description && (
          <p className="mb-3 text-sm text-text-secondary">{repository.description}</p>
        )}
        {repository.language && (
          <span className="font-mono text-xs text-text-tertiary">{repository.language}</span>
        )}
      </Card>
    </Link>
  );
}

export function GithubHighlights() {
  const { t } = useLocale();
  const { data } = useGithub();

  if (data.repositories.length === 0) return null;

  return (
    <Section>
      <Container size="wide">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar
              src={data.profile.avatarUrl}
              alt={data.profile.name ?? data.profile.login}
              fallback={data.profile.login.slice(0, 2).toUpperCase()}
            />
            <div>
              <Heading as="h2" size="h3">
                {t('home.github.title')}
              </Heading>
              {data.profile.bio && (
                <p className="text-sm text-text-secondary">{data.profile.bio}</p>
              )}
            </div>
          </div>
          <Link href={data.profile.url} target="_blank" rel="noreferrer" variant="accent">
            {t('home.github.cta')}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.repositories.map((repository) => (
            <RepositoryCard key={repository.name} repository={repository} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
