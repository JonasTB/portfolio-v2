import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Tag semântica real — controla a ordem de headings para leitores de tela. */
  as: HeadingTag;
  /** Escala visual. Por padrão acompanha `as`; use para descolar estilo de semântica. */
  size?: HeadingTag;
}

const sizeClasses: Record<HeadingTag, string> = {
  h1: 'text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]',
  h2: 'text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]',
  h3: 'text-2xl md:text-3xl font-medium tracking-tight leading-snug',
  h4: 'text-lg md:text-xl font-medium tracking-tight leading-snug',
};

export function Heading({ as, size, className, ...props }: HeadingProps) {
  const Tag = as;
  return (
    <Tag className={cn('font-heading text-text', sizeClasses[size ?? as], className)} {...props} />
  );
}
