import { Link as RouterLink } from 'react-router';
import { useLocale } from '../app/providers/useLocale';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Button, Container, Heading, Section } from '../components/ui';

export function NotFoundPage() {
  const { t } = useLocale();
  useDocumentHead({ title: t('notFound.title'), noindex: true });

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <div className="rounded-lg border border-border bg-surface p-6 font-mono text-sm">
          <p className="text-text-tertiary">$ cd {window.location.pathname}</p>
          <p className="mt-1 text-red-500">
            bash: cd: {window.location.pathname}: {t('notFound.terminalError')}
          </p>
          <p className="mt-3 text-text-tertiary">
            $ echo $?<span className="motion-safe:animate-pulse">_</span>
          </p>
          <p className="mt-1 text-text-secondary">404</p>
        </div>

        <Heading as="h1" className="mt-8">
          {t('notFound.title')}
        </Heading>
        <p className="mt-4 max-w-lg text-lg text-text-secondary">{t('notFound.description')}</p>
        <Button asChild className="mt-8">
          <RouterLink to="/">{t('notFound.cta')}</RouterLink>
        </Button>
      </Container>
    </Section>
  );
}
