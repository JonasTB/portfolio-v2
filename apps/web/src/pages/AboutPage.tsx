import type { LocalizedText } from '@portfolio/contracts';
import { useLocale } from '../app/providers/useLocale';
import { useLocalizedText } from '../hooks/useLocalizedText';
import { useProfile } from '../hooks/useProfile';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { InterestsGrid } from '../components/about/InterestsGrid';
import { Container, Heading, Section } from '../components/ui';

function ProfessionalParagraph({ paragraph }: { paragraph: LocalizedText }) {
  const text = useLocalizedText(paragraph);
  return <p className="text-base text-text-secondary">{text}</p>;
}

export function AboutPage() {
  const { t } = useLocale();
  const { data: profile } = useProfile();
  useDocumentHead({ title: 'About', description: t('about.intro'), path: '/about' });

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <Heading as="h1">About</Heading>
        <p className="mt-4 text-lg text-text-secondary">{t('about.intro')}</p>

        <div className="mt-12">
          <Heading as="h2" size="h4" className="mb-4 text-text-tertiary uppercase">
            {t('about.professional.title')}
          </Heading>
          <div className="flex flex-col gap-4">
            {profile.professional.paragraphs.map((paragraph, index) => (
              <ProfessionalParagraph key={index} paragraph={paragraph} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Heading as="h2" size="h4" className="mb-6 text-text-tertiary uppercase">
            {t('about.personal.title')}
          </Heading>
          <InterestsGrid interests={profile.interests} />
        </div>
      </Container>
    </Section>
  );
}
