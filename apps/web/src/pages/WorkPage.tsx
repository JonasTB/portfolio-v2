import { useLocale } from '../app/providers/useLocale';
import { useExperience } from '../hooks/useExperience';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { ExperienceList } from '../components/work/ExperienceList';
import { Container, Heading, Section } from '../components/ui';

export function WorkPage() {
  const { t } = useLocale();
  const { data: experiences } = useExperience();
  useDocumentHead({ title: 'Work', description: t('work.intro'), path: '/work' });

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <Heading as="h1">Work</Heading>
        <p className="mt-4 mb-12 text-lg text-text-secondary">{t('work.intro')}</p>
        <ExperienceList experiences={experiences} />
      </Container>
    </Section>
  );
}
