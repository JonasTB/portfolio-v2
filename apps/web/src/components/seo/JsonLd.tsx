/** Renderiza um bloco JSON-LD — válido em qualquer lugar do documento, não só no <head>. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
