import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid = false, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          'h-10 w-full rounded-md border bg-surface px-3 text-sm text-text placeholder:text-text-tertiary transition-colors duration-150 ease-signature focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          invalid ? 'border-red-500' : 'border-border',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
