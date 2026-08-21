import { Container, Heading, Section } from '../ui';

interface PagePlaceholderProps {
  title: string;
  description: string;
  etapa: string;
}

export function PagePlaceholder({ title, description, etapa }: PagePlaceholderProps) {
  return (
    <Section spacing="lg">
      <Container size="narrow">
        <p className="mb-3 font-mono text-xs text-text-tertiary">{etapa}</p>
        <Heading as="h1">{title}</Heading>
        <p className="mt-4 max-w-lg text-lg text-text-secondary">{description}</p>
      </Container>
    </Section>
  );
}
