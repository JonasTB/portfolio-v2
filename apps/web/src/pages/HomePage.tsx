import { useProfile } from '../hooks/useProfile';
import { useLocalizedText } from '../hooks/useLocalizedText';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Hero } from '../components/home/Hero';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { GithubHighlights } from '../components/home/GithubHighlights';
import { RecentActivity } from '../components/home/RecentActivity';
import { PersonJsonLd } from '../components/seo/PersonJsonLd';
import { Divider } from '../components/ui';

export function HomePage() {
  const { data: profile } = useProfile();
  const role = useLocalizedText(profile.role);
  const tagline = useLocalizedText(profile.tagline);
  useDocumentHead({
    title: `${profile.name} — ${role}`,
    description: tagline,
    path: '/',
    raw: true,
  });

  return (
    <>
      <PersonJsonLd profile={profile} />
      <Hero profile={profile} />
      <Divider />
      <FeaturedProjects />
      <Divider />
      <GithubHighlights />
      <Divider />
      <RecentActivity />
    </>
  );
}
