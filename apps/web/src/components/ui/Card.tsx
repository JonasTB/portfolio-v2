import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ hoverable = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface p-6 shadow-elevated-sm',
        hoverable && 'transition-shadow duration-200 ease-signature hover:shadow-elevated-md',
        className,
      )}
      {...props}
    />
  );
}
