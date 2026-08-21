import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type IconButtonSize = 'sm' | 'md';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: IconButtonSize;
  /** Nome acessível — obrigatório: o botão só expõe o ícone visualmente. */
  'aria-label': string;
}

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-text-secondary transition-colors duration-150 ease-signature hover:bg-surface-hover hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50',
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
