import { Link as RouterLink } from 'react-router';
import { GitFork } from 'lucide-react';
import type { Profile } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { Badge, Button, Container, Heading } from '../ui';
import { PhotoFrame } from './PhotoFrame';
import { CurrentlyCard } from './CurrentlyCard';

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function Hero({ profile }: { profile: Profile }) {
  const { t } = useLocale();
  const role = useLocalizedText(profile.role);
  const tagline = useLocalizedText(profile.tagline);
  const shortBio = useLocalizedText(profile.shortBio);

  return (
    <Container size="wide">
      <div className="grid gap-10 py-16 sm:py-20 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16 md:py-28">
        <div>
          <span className="inline-flex rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-text-secondary">
            {t('home.hero.badge')}
          </span>

          <Heading as="h1" className="mt-6">
            {profile.name}
          </Heading>
          <p className="mt-2 font-heading text-xl text-text-secondary md:text-2xl">{role}</p>
          <p className="mt-5 max-w-lg text-lg text-text-secondary">{tagline}</p>
          <p className="mt-3 max-w-lg text-base text-text-secondary">{shortBio}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {profile.specialties.map((specialty) => (
              <Badge key={specialty}>{specialty}</Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <RouterLink to="/projects">{t('home.cta.projects')}</RouterLink>
            </Button>
            <Button asChild variant="secondary">
              <RouterLink to="/contact">{t('home.cta.contact')}</RouterLink>
            </Button>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors duration-150 ease-signature hover:bg-surface-hover hover:text-text"
            >
              <GitFork size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 md:items-end">
          <PhotoFrame name={profile.name} initials={initialsOf(profile.name)} src={profile.photo} />
          <CurrentlyCard currently={profile.currently} />
        </div>
      </div>
    </Container>
  );
}
