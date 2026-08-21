import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type ContainerSize = 'narrow' | 'default' | 'wide';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-5xl',
  wide: 'max-w-6xl',
};

export function Container({ size = 'default', className, ...props }: ContainerProps) {
  return <div className={cn('mx-auto w-full px-6', sizeClasses[size], className)} {...props} />;
}
