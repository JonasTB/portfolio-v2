import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ invalid = false, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          'min-h-32 w-full resize-y rounded-md border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-tertiary transition-colors duration-150 ease-signature focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          invalid ? 'border-red-500' : 'border-border',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
