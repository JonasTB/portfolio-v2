import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Gamepad2 } from 'lucide-react';
import { useKonamiCode } from '../../hooks/useKonamiCode';
import { useLocale } from '../../app/providers/useLocale';

const VISIBLE_DURATION_MS = 4000;

export function KonamiEasterEgg() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const reducedMotion = useReducedMotion();
  const { t } = useLocale();

  const activate = useCallback(() => {
    setVisible(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setVisible(false), VISIBLE_DURATION_MS);
  }, []);

  useKonamiCode(activate);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-text shadow-elevated-md"
          initial={reducedMotion ? false : { opacity: 0, y: 12, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 12, x: '-50%' }}
          transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Gamepad2 size={16} className="text-accent" />
          {t('easterEgg.konami')}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
