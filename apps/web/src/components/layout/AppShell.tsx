import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLocale } from '../../app/providers/useLocale';
import { Header } from './Header';
import { Footer } from './Footer';
import { KonamiEasterEgg } from '../easter-eggs/KonamiEasterEgg';
import { ConsoleGreeting } from '../easter-eggs/ConsoleGreeting';

export function AppShell() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const { t } = useLocale();

  return (
    <div className="flex min-h-svh flex-col bg-bg text-text">
      <a
        href="#main-content"
        className="absolute top-2 left-2 z-50 -translate-y-16 rounded-md bg-accent px-4 py-2 text-sm text-accent-foreground opacity-0 transition-transform duration-150 ease-signature focus:translate-y-0 focus:opacity-100"
      >
        {t('a11y.skipToContent')}
      </a>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={location.pathname}
          className="flex-1"
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <KonamiEasterEgg />
      <ConsoleGreeting />
    </div>
  );
}
