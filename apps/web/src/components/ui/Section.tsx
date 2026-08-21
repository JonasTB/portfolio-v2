import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingClasses = {
  sm: 'py-12',
  md: 'py-20',
  lg: 'py-28',
};

export function Section({ spacing = 'md', className, ...props }: SectionProps) {
  return <section className={cn(spacingClasses[spacing], className)} {...props} />;
}
