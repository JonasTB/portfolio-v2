import { useState } from 'react';
import { cn } from '../../lib/cn';

type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  src?: string;
  alt: string;
  /** Iniciais mostradas quando não há imagem ou ela falha ao carregar. */
  fallback: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-20 w-20 text-lg',
};

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      role="img"
      aria-label={alt}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-hover font-medium text-text-secondary',
        sizeClasses[size],
        className,
      )}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden="true">{fallback}</span>
      )}
    </span>
  );
}
