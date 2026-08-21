import type { Profile } from '@portfolio/contracts';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { JsonLd } from './JsonLd';

export function PersonJsonLd({ profile }: { profile: Profile }) {
  const jobTitle = useLocalizedText(profile.role);
  const sameAs = [profile.social.github, profile.social.linkedin].filter((url): url is string =>
    Boolean(url),
  );

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle,
        url: window.location.origin,
        sameAs,
      }}
    />
  );
}
