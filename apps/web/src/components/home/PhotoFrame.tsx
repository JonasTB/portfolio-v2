interface PhotoFrameProps {
  src?: string;
  name: string;
  initials: string;
}

/**
 * Sem `src` real ainda (nenhum arquivo de foto foi fornecido) — degrada
 * graciosamente para as iniciais sobre um fundo com o accent, em vez de
 * quebrar o layout ou usar um placeholder genérico de terceiros.
 */
export function PhotoFrame({ src, name, initials }: PhotoFrameProps) {
  return (
    <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-surface shadow-elevated-md sm:max-w-sm">
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div
          role="img"
          aria-label={name}
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/15 to-accent/5"
        >
          <span className="font-heading text-6xl font-semibold text-accent/60">{initials}</span>
        </div>
      )}
    </div>
  );
}
