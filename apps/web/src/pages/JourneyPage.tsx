import { useLocale } from '../app/providers/useLocale';
import { journeyMilestones } from '../content/journey';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Timeline } from '../components/journey/Timeline';
import { Container, Heading, Section } from '../components/ui';

export function JourneyPage() {
  const { t } = useLocale();
  useDocumentHead({ title: 'Journey', description: t('journey.intro'), path: '/journey' });

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <Heading as="h1">Journey</Heading>
        <p className="mt-4 mb-12 text-lg text-text-secondary">{t('journey.intro')}</p>
        <Timeline milestones={journeyMilestones} />
      </Container>
    </Section>
  );
}
