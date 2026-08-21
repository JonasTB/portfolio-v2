import { useLocale } from '../app/providers/useLocale';
import { useLab } from '../hooks/useLab';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { LabCard } from '../components/lab/LabCard';
import { LabEmptyState } from '../components/lab/LabEmptyState';
import { Container, Heading, Section } from '../components/ui';

export function LabPage() {
  const { t } = useLocale();
  const { data: experiments } = useLab();
  useDocumentHead({ title: 'Lab', description: t('lab.intro'), path: '/lab' });

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <Heading as="h1">Lab</Heading>
        <p className="mt-4 mb-12 text-lg text-text-secondary">{t('lab.intro')}</p>
        {experiments.length === 0 ? (
          <LabEmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {experiments.map((experiment) => (
              <LabCard key={experiment.slug} experiment={experiment} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
