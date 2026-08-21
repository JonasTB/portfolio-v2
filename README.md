# Portfolio

Portfólio pessoal de [Jonas Timbaúba](https://github.com/JonasTB) — monorepo com frontend React/Vite e backend NestJS, conteúdo estruturado servido via REST, integração real com a API do GitHub, i18n pt-BR/en-US e dark/light mode.

## Stack

- **`apps/web`** — React 19, TypeScript, Vite, Tailwind CSS v4, React Router, TanStack Query, Motion, Radix UI, React Hook Form + Zod.
- **`apps/api`** — NestJS 11 (modular monolith), prefixo `/api`, versionamento `/v1`, ValidationPipe global.
- **`packages/contracts`** — schemas Zod compartilhados entre web e api (dual-package ESM/CJS).
- **`packages/config`** — tsconfig e ESLint base compartilhados.
- **pnpm workspaces + Turborepo** orquestrando o monorepo.

## Estrutura

```text
apps/
  web/     # frontend
  api/     # backend
packages/
  contracts/  # schemas Zod + tipos compartilhados
  config/     # tsconfig/eslint base
docs/         # decisões de arquitetura, modelo de conteúdo, integrações, deploy
```

## Rodando localmente

Requer Node ≥22 e pnpm (versão fixada em `packageManager`, `corepack enable` resolve automaticamente).

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Isso sobe `apps/web` em `http://localhost:5173` e `apps/api` em `http://localhost:3000`. Variáveis de ambiente estão documentadas em [`.env.example`](.env.example) e, com mais detalhe (o que cada uma faz, onde configurar em produção), em [`docs/deployment.md`](docs/deployment.md).

## Scripts

```bash
pnpm dev            # web + api em modo watch
pnpm build           # build de produção (todos os workspaces)
pnpm lint            # eslint
pnpm typecheck       # tsc --noEmit
pnpm test            # vitest (web) + jest (api)
pnpm format          # prettier --write
pnpm format:check    # prettier --check
```

A API também tem `test:e2e` (`pnpm --filter @portfolio/api test:e2e`).

## Deploy

`apps/web` na Vercel, `apps/api` como container Docker na Railway. CI (GitHub Actions) roda `install → lint → typecheck → format:check → test → test:e2e → build` em todo PR, mais um job que valida o build da imagem Docker da API. Detalhes completos — variáveis de ambiente por ambiente, passo a passo de cada provedor, `Dockerfile` — em [`docs/deployment.md`](docs/deployment.md).

## Documentação

- [`docs/architecture.md`](docs/architecture.md) — decisões de arquitetura do monorepo, frontend e backend.
- [`docs/content-model.md`](docs/content-model.md) — modelo de conteúdo (perfil, experiência, projetos, posts, activity).
- [`docs/integrations.md`](docs/integrations.md) — integração com GitHub e LinkedIn.
- [`docs/design-direction.md`](docs/design-direction.md) — direção visual e identidade.
- [`docs/deployment.md`](docs/deployment.md) — CI/CD, Docker, variáveis de ambiente, deploy.

## Licença

Projeto pessoal — código disponível para consulta, sem licença de reuso.
