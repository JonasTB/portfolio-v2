import { forwardRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/cn';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'accent';
  /** Renderiza o filho (ex.: um Link de rota) no lugar de <a>, herdando o estilo. */
  asChild?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'default', asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    return (
      <Comp
        ref={ref}
        className={cn(
          'underline decoration-1 underline-offset-4 transition-colors duration-150 ease-signature',
          variant === 'accent'
            ? 'text-accent decoration-accent/40 hover:decoration-accent'
            : 'text-text decoration-border hover:decoration-text',
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Link.displayName = 'Link';
