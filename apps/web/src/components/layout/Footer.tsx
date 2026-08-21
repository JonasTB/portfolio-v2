import { GitFork } from 'lucide-react';
import { useLocale } from '../../app/providers/useLocale';
import { useProfile } from '../../hooks/useProfile';
import { Container, Link } from '../ui';

export function Footer() {
  const { t } = useLocale();
  const { data: profile } = useProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container
        size="wide"
        className="flex flex-col items-center gap-4 py-10 text-sm text-text-tertiary sm:flex-row sm:justify-between"
      >
        <p>
          © {year} Jonas Timbaúba — {t('footer.rights')}
        </p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs">{t('footer.builtWith')}</span>
          <Link href={profile.social.github} target="_blank" rel="noreferrer">
            <span className="inline-flex items-center gap-1.5">
              <GitFork size={14} />
              GitHub
            </span>
          </Link>
        </div>
      </Container>
    </footer>
  );
}
