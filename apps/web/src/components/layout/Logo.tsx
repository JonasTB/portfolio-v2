import { useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn';

const CLICKS_TO_TRIGGER = 5;
const CLICK_WINDOW_MS = 1500;
const CELEBRATION_DURATION_MS = 900;

/**
 * Marca original: monograma "JT" + cursor de terminal piscando.
 * Referência nerd discreta via cultura de terminal/código — sem uso de
 * personagens ou artes de franquias de terceiros.
 *
 * Easter egg: alguns cliques rápidos fazem o cursor "acelerar" por um
 * instante — descoberta por curiosidade, não anunciada em lugar nenhum.
 */
export function Logo({ className }: { className?: string }) {
  const [celebrating, setCelebrating] = useState(false);
  const clicksRef = useRef<number[]>([]);
  const reducedMotion = useReducedMotion();

  function handleClick() {
    if (reducedMotion) return;
    const now = Date.now();
    clicksRef.current = [...clicksRef.current, now].filter(
      (timestamp) => now - timestamp < CLICK_WINDOW_MS,
    );
    if (clicksRef.current.length >= CLICKS_TO_TRIGGER) {
      clicksRef.current = [];
      setCelebrating(true);
      window.setTimeout(() => setCelebrating(false), CELEBRATION_DURATION_MS);
    }
  }

  return (
    <svg
      viewBox="0 0 32 32"
      className={cn(className, celebrating && 'motion-safe:animate-bounce')}
      role="img"
      aria-label="Jonas Timbáuba"
      onClick={handleClick}
    >
      <rect width="32" height="32" rx="9" className="fill-accent" />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        className="fill-accent-foreground font-heading"
        style={{ fontSize: 13, fontWeight: 600 }}
      >
        JT
      </text>
      <rect
        x="23.5"
        y="10"
        width="2"
        height="4"
        rx="0.5"
        className={cn(
          'fill-accent-foreground',
          celebrating ? 'motion-safe:animate-ping' : 'motion-safe:animate-pulse',
        )}
      />
    </svg>
  );
}
