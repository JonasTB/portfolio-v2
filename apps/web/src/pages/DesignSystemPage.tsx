import { useState } from 'react';
import { GitFork, Moon, Sun } from 'lucide-react';
import { useDocumentHead } from '../hooks/useDocumentHead';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Heading,
  IconButton,
  Link,
  Section,
  Tooltip,
} from '../components/ui';

const colorTokens = [
  { name: 'bg', className: 'bg-bg' },
  { name: 'surface', className: 'bg-surface' },
  { name: 'surface-hover', className: 'bg-surface-hover' },
  { name: 'border', className: 'bg-border' },
  { name: 'accent', className: 'bg-accent' },
];

const textTokens = [
  { name: 'text', className: 'text-text' },
  { name: 'text-secondary', className: 'text-text-secondary' },
  { name: 'text-tertiary', className: 'text-text-tertiary' },
];

function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 rounded-md border border-border ${className}`} />
      <span className="font-mono text-xs text-text-secondary">{name}</span>
    </div>
  );
}

/**
 * Página de referência interna (não listada na navegação) — mantida das
 * ETAPAs 03/04 para validar tokens e primitives conforme o design system evolui.
 */
export function DesignSystemPage() {
  const [dark, setDark] = useState(true);
  useDocumentHead({ title: 'Design System', noindex: true });

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-svh bg-bg text-text">
        <header className="sticky top-0 z-10 border-b border-border bg-bg/80 backdrop-blur">
          <Container size="wide" className="flex h-16 items-center justify-between">
            <span className="font-heading text-sm font-medium tracking-wide text-text-secondary uppercase">
              Design System — página de referência
            </span>
            <Tooltip content={dark ? 'Mudar para light' : 'Mudar para dark'}>
              <IconButton
                aria-label={dark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
                icon={dark ? <Moon size={18} /> : <Sun size={18} />}
                onClick={() => setDark((v) => !v)}
              />
            </Tooltip>
          </Container>
        </header>

        <Container size="wide">
          <Section spacing="lg">
            <Heading as="h1">Fundação visual do portfólio.</Heading>
            <p className="mt-4 max-w-xl text-lg text-text-secondary">
              Tokens de tipografia, cor, espaçamento e os primitives que sustentam todas as páginas.
            </p>
          </Section>

          <Divider />

          <Section>
            <Heading as="h2" className="mb-8">
              Tipografia
            </Heading>
            <div className="flex flex-col gap-6">
              <Heading as="h1">Heading h1 — Space Grotesk</Heading>
              <Heading as="h2">Heading h2 — Space Grotesk</Heading>
              <Heading as="h3">Heading h3 — Space Grotesk</Heading>
              <Heading as="h4">Heading h4 — eyebrow / label</Heading>
              <p className="max-w-2xl text-base text-text">
                Corpo de texto em Inter — legibilidade em primeiro lugar para parágrafos longos,
                bios e case studies.
              </p>
              <p className="font-mono text-sm text-text-secondary">
                font-mono — JetBrains Mono, reservado para código e contexto de terminal.
              </p>
            </div>
          </Section>

          <Divider />

          <Section>
            <Heading as="h2" className="mb-8">
              Cor
            </Heading>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {colorTokens.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-6">
              {textTokens.map((token) => (
                <span key={token.name} className={`font-mono text-sm ${token.className}`}>
                  {token.name}
                </span>
              ))}
            </div>
          </Section>

          <Divider />

          <Section>
            <Heading as="h2" className="mb-8">
              Botões
            </Heading>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
          </Section>

          <Divider />

          <Section>
            <Heading as="h2" className="mb-8">
              Badges, links e avatar
            </Heading>
            <div className="flex flex-wrap items-center gap-4">
              <Badge>Neutral</Badge>
              <Badge variant="accent">Accent</Badge>
              <Link href="#">Link padrão</Link>
              <Link href="#" variant="accent">
                Link accent
              </Link>
              <Avatar alt="Jonas Timbáuba" fallback="JT" />
              <Avatar alt="Jonas Timbáuba" fallback="JT" size="lg" />
            </div>
          </Section>

          <Divider />

          <Section>
            <Heading as="h2" className="mb-8">
              Card
            </Heading>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card hoverable>
                <div className="mb-3 flex items-center gap-2 text-text-secondary">
                  <GitFork size={16} />
                  <span className="text-sm">Open Source</span>
                </div>
                <Heading as="h3" size="h4" className="mb-2">
                  Card com hover
                </Heading>
                <p className="text-sm text-text-secondary">
                  Sombra sutil no light mode, borda em destaque no dark mode.
                </p>
              </Card>
              <Card>
                <Heading as="h3" size="h4" className="mb-2">
                  Card estático
                </Heading>
                <p className="text-sm text-text-secondary">
                  Mesma superfície, sem elevação adicional no hover.
                </p>
              </Card>
            </div>
          </Section>

          <Divider />

          <Section spacing="lg">
            <Heading as="h2" className="mb-8">
              Dark / light lado a lado
            </Heading>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="light rounded-lg border border-border bg-bg p-6">
                <p className="mb-4 font-mono text-xs text-text-tertiary">forçado: light</p>
                <Heading as="h3" size="h4" className="mb-2">
                  Superfície clara
                </Heading>
                <p className="mb-4 text-sm text-text-secondary">Texto secundário sobre bg.</p>
                <Button variant="primary" size="sm">
                  Accent
                </Button>
              </div>
              <div className="dark rounded-lg border border-border bg-bg p-6">
                <p className="mb-4 font-mono text-xs text-text-tertiary">forçado: dark</p>
                <Heading as="h3" size="h4" className="mb-2">
                  Superfície escura
                </Heading>
                <p className="mb-4 text-sm text-text-secondary">Texto secundário sobre bg.</p>
                <Button variant="primary" size="sm">
                  Accent
                </Button>
              </div>
            </div>
          </Section>
        </Container>
      </div>
    </div>
  );
}
