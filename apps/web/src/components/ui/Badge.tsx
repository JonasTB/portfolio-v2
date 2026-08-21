import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type BadgeVariant = 'neutral' | 'accent';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-surface-hover text-text-secondary border border-border',
  accent: 'bg-accent/10 text-accent border border-accent/20',
};

export function Badge({ variant = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
