import { Link as RouterLink } from 'react-router';
import type { Activity } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { useActivity } from '../../hooks/useActivity';
import { Container, Heading, Section } from '../ui';

const PREVIEW_LIMIT = 6;

function ActivityRow({ item }: { item: Activity }) {
  const { locale } = useLocale();
  const title = useLocalizedText(item.title);
  const date = new Date(item.createdAt).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const row = (
    <li className="flex items-baseline gap-4 border-l border-border py-3 pl-4">
      <span className="font-mono text-xs whitespace-nowrap text-text-tertiary">{date}</span>
      <span className="text-sm text-text-secondary">{title}</span>
    </li>
  );

  if (!item.url) return row;

  const linkClassName = 'transition-colors duration-150 ease-signature hover:text-text';
  if (item.url.startsWith('http')) {
    return (
      <a href={item.url} target="_blank" rel="noreferrer" className={linkClassName}>
        {row}
      </a>
    );
  }
  return (
    <RouterLink to={item.url} className={linkClassName}>
      {row}
    </RouterLink>
  );
}

export function RecentActivity() {
  const { t } = useLocale();
  const { data: activity } = useActivity();
  const preview = activity.slice(0, PREVIEW_LIMIT);

  if (preview.length === 0) return null;

  return (
    <Section>
      <Container size="wide">
        <Heading as="h2" className="mb-8">
          {t('home.activity.title')}
        </Heading>
        <ul className="flex flex-col">
          {preview.map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
