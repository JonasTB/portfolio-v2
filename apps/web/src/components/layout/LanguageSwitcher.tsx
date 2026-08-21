import { useLocale } from '../../app/providers/useLocale';
import { Tooltip } from '../ui';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  const handleClick = () => {
    setLocale(locale === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  return (
    <Tooltip content={t('locale.toggle')}>
      <button
        type="button"
        aria-label={t('locale.toggle')}
        onClick={handleClick}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md font-mono text-xs font-medium text-text-secondary transition-colors duration-150 ease-signature hover:bg-surface-hover hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {locale === 'pt-BR' ? 'PT' : 'EN'}
      </button>
    </Tooltip>
  );
}
