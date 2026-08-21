import { useEffect } from 'react';
import { useLocale } from '../../app/providers/useLocale';

/**
 * Mensagem no console para quem abre o devtools por curiosidade — não
 * afeta a UI, só quem já sabe olhar (`PRODUCT_BRIEF.md`: "quem conhece
 * deve perceber os detalhes").
 */
export function ConsoleGreeting() {
  const { t } = useLocale();

  useEffect(() => {
    console.log('%cJT_', 'color:#6d4fe0;font-family:monospace;font-weight:bold;font-size:20px;');
    console.log(
      `%c${t('easterEgg.console')}`,
      'color:#6d4fe0;font-family:monospace;font-size:13px;',
    );
  }, [t]);

  return null;
}
