import { useLocale } from '../app/providers/useLocale';
import { useProfile } from '../hooks/useProfile';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { ContactChannels } from '../components/contact/ContactChannels';
import { ContactForm } from '../components/contact/ContactForm';
import { Container, Heading, Section } from '../components/ui';

export function ContactPage() {
  const { t } = useLocale();
  const { data: profile } = useProfile();
  useDocumentHead({ title: 'Contact', description: t('contact.intro'), path: '/contact' });

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <Heading as="h1">Contact</Heading>
        <p className="mt-4 mb-12 text-lg text-text-secondary">{t('contact.intro')}</p>

        <ContactChannels social={profile.social} />

        <div className="mt-12">
          <Heading as="h2" size="h3" className="mb-6">
            {t('contact.form.title')}
          </Heading>
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
