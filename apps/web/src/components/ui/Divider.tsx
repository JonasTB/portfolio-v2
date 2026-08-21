import { cn } from '../../lib/cn';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'border-border',
        orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
        className,
      )}
    />
  );
}
