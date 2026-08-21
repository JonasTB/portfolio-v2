# Architecture — Decisões da ETAPA 01

## Estado atual do repositório

Repositório novo, sem código de aplicação. Contém apenas o starter kit:

```text
CLAUDE.md, START_HERE.md, MANIFEST.md, .env.example, .gitignore.example
docs/ (PRODUCT_BRIEF, VISUAL_DIRECTION, TECHNICAL_ARCHITECTURE, EXECUTION_PLAN, references/)
prompts/COMMANDS.md
```

Nenhuma decisão prévia de arquitetura precisa ser preservada — partimos do zero, seguindo a stack obrigatória definida em `docs/TECHNICAL_ARCHITECTURE.md`.

---

## Monorepo

**pnpm workspaces + Turborepo**, conforme mandatado.

```text
portfolio/
├── apps/
│   ├── web/          # React + Vite + TypeScript + Tailwind
│   └── api/           # NestJS (modular monolith)
├── packages/
│   ├── contracts/     # Zod schemas + tipos compartilhados (Profile, Project, Post, Experience, Activity, Contact)
│   └── config/        # tsconfig base, eslint base, prettier config compartilhados
├── docs/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

### `packages/ui` — decisão: **não criar agora**

Só existe um consumidor de UI (`apps/web`). Extrair um design system para pacote isolado antes de haver um segundo consumidor real é abstração prematura (viola `CLAUDE.md`: "não crie packages vazios sem necessidade real"). Os primitives (`Button`, `Card`, `Heading` etc., ETAPA 03) vivem em `apps/web/src/components/ui`. Revisitar somente se surgir um segundo app (ex.: storybook publicado, microsite) que precise consumir os mesmos componentes.

### `packages/contracts`

Fonte única de verdade para os formatos de dados que atravessam a fronteira API↔Web: schemas Zod + tipos inferidos para `Profile`, `Experience`, `Project`, `Post` (metadata), `Activity`, `ContactRequest`. Evita duplicação manual de interfaces e permite validar o mesmo payload nos dois lados (Nest `ValidationPipe` na API, checagem opcional no client).

### `packages/config`

Base de `tsconfig.json`, config do ESLint e do Prettier compartilhadas entre `apps/web` e `apps/api`, evitando divergência de regras entre frontend e backend. Não inclui preset do Tailwind (uso exclusivo do `apps/web`, fica local a ele).

---

## Frontend (`apps/web`)

- React + TypeScript + Vite + Tailwind CSS.
- **React Router** para roteamento (SPA multi-página: Home, About, Journey, Work, Projects, Posts, Lab, Contact).
- **TanStack Query** para todo o server state (profile, projects, posts, activity, github) — cache, retry, loading/error states desacoplados de lógica de UI.
- **Zod** reaproveitado de `packages/contracts` para tipos; validação de formulários (contato) com **React Hook Form + Zod**.
- **Motion** (Framer Motion / motion.dev) apenas para as transições discretas descritas em `VISUAL_DIRECTION.md` (entrada suave, reveal, theme transition) — respeitando `prefers-reduced-motion`.
- **Lucide** para ícones. **Radix UI** como primitives acessíveis não estilizados (dialog, tooltip, dropdown da command palette), estilizados via Tailwind — nunca a aparência pronta do shadcn/ui.
- Nenhuma dessas libs entra "por padrão"; cada uma resolve uma necessidade concreta já prevista no brief (command palette, tema, formulário, animação).

### Gerenciamento de estado

Ordem de preferência aplicada estritamente:

1. estado local de componente;
2. estado na URL (filtros de projects, tab ativa etc.);
3. server state via TanStack Query;
4. Context (tema, locale — estado global pequeno e estável);
5. state manager dedicado — **não previsto**, nenhuma necessidade concreta identificada.

---

## Backend (`apps/api`)

NestJS, **modular monolith**, organizado por domínio:

```text
modules/
  profile/        # dados de perfil, currently/now
  experience/      # work/experience (timeline de carreira)
  projects/
  posts/           # markdown/mdx parsing, metadata, reading time
  lab/
  activity/        # agregador normalizado (github + posts + projects + lab + linkedin)
  integrations/
    github/
    linkedin/       # contrato + provider local; provider oficial fica reservado
  contact/
  health/
```

Cada módulo usa `controller / service / domain / dto` apenas quando há complexidade real que justifique a separação — módulos simples (ex. `health`) ficam enxutos, sem camadas artificiais.

### Por que conteúdo estruturado mora na API, e não só no frontend

`TECHNICAL_ARCHITECTURE.md` já define módulos de domínio (`profile`, `projects`, `posts`, `activity`) e rotas REST correspondentes. Isso só faz sentido se a API for a fonte de verdade do conteúdo estruturado — do contrário os módulos existiriam só para reexportar arquivos estáticos do frontend, o que seria camada sem função.

Decisão: **profile, experience, projects (metadata), lab e posts (frontmatter + corpo Markdown) vivem em `apps/api/src/content/*` como dados locais tipados**, expostos via REST e validados pelos schemas de `packages/contracts`. Motivos:

- permite o `ActivityService` agregar posts/projects/lab junto com GitHub num único feed cronológico no servidor, sem duplicar a mesma informação em dois lugares;
- mantém o princípio "componentes renderizam conteúdo, não são o banco de dados do conteúdo" também no backend;
- caminho natural para, no futuro, trocar arquivos locais por um CMS/DB sem tocar no frontend (a interface REST não muda).

O frontend consome tudo via TanStack Query, com `staleTime` alto para conteúdo que muda pouco (profile, experience) e mais curto para `activity`.

### Posts (Markdown/MDX)

Arquivos `.md`/`.mdx` em `apps/api/src/content/posts/*`. A API faz parsing de frontmatter (`gray-matter`) + Markdown→HTML (`remark`/`rehype`, `shiki` para syntax highlighting) e devolve JSON estruturado (`{ metadata, html, readingTime }`) via `/api/v1/posts` e `/api/v1/posts/:slug`. O frontend renderiza o HTML recebido (sanitizado) — sem reprocessar Markdown no client.

**Risco assumido aqui**, ver seção de riscos: como o front é uma SPA Vite (sem SSR), o conteúdo do post só existe após o fetch client-side, o que limita SEO/crawling de rotas dinâmicas. Mitigação inicial: meta tags dinâmicas via document head manager + prefetch agressivo (hover/route). Reavaliar prerendering na ETAPA 16 se necessário.

### NestJS bootstrap (aplicado a partir da ETAPA 02)

`/api` global prefix, versionamento `/v1`, `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`), CORS restrito a `WEB_URL`, Helmet, rate limiting, exception filter consistente, structured logging com correlation id, graceful shutdown, Swagger só em dev, `/health`.

---

## Estratégia de conteúdo (resumo — detalhado em `docs/content-model.md`)

Conteúdo como dado tipado, fonte única na API, validado por `packages/contracts`. i18n (pt-BR/en-US) tratado como campos localizados dentro do mesmo objeto de conteúdo, não como arquivos duplicados por idioma.

---

## Estratégia GitHub (resumo — detalhado em `docs/integrations.md`)

Integração real via API oficial do GitHub, só no backend, com cache, timeout e fallback para dado local. Nunca vira dashboard de métricas.

## Estratégia LinkedIn (resumo — detalhado em `docs/integrations.md`)

Sem scraping. Contrato `ProfessionalNetworkProvider`; `LocalProfessionalProfileProvider` é a fonte de verdade agora; `LinkedinProvider` fica arquitetado mas não implementado até confirmação de acesso oficial viável.

---

## Deploy

- **Frontend (`apps/web`)**: build estático (Vite) hospedado em **Vercel** — preview deployments automáticos por PR, CDN global, custom domain simples, tier gratuito suficiente para portfólio pessoal. Alternativa portável: Cloudflare Pages (sem lock-in, build idêntico).
- **Backend (`apps/api`)**: processo Node long-running (NestJS não é serverless-friendly sem adaptação) → **Railway** como opção primária (Docker-first, DX simples, custo previsível para carga baixa). Alternativas equivalentes: Render, Fly.io. `Dockerfile` da API criado na ETAPA 18, mantendo a stack portável entre esses provedores.
- **Domínio**: `web` na raiz do domínio pessoal, `api` em subdomínio (`api.<dominio>`), CORS restrito ao `WEB_URL` de produção. Decisão final de DNS/proxy fica para a ETAPA 18.
- **CI**: GitHub Actions, `install → lint → typecheck → test → build`, rodando em Pull Requests (ETAPA 18 implementa o workflow).

---

## Riscos e simplificações identificados

1. **SEO em SPA sem SSR.** Vite puro entrega conteúdo dinâmico (posts, projects) via client-side fetch. Crawlers modernos (Google, LinkedIn) em geral executam JS, mas não é garantia universal. _Simplificação aceita agora_; mitigação com meta tags dinâmicas + prefetch; reavaliar prerendering de rotas críticas na ETAPA 16 caso a auditoria de SEO acuse problema real.
2. **Acesso oficial ao LinkedIn é incerto.** APIs de perfil/posts do LinkedIn são restritas a parceiros aprovados; é provável que não haja acesso disponível para uma aplicação pessoal. _Mitigação_: `LocalProfessionalProfileProvider` é tratado como fonte de verdade real (não só fallback teórico); `LinkedinProvider` fica com contrato pronto, implementação adiada até confirmação concreta de acesso (ETAPA 12).
3. **Overhead de monorepo para projeto solo.** Turborepo + pnpm workspaces adiciona configuração para um único desenvolvedor. _Mitigação_: manter pipeline de build/lint/test mínimo e conceitualmente simples (sem cache remoto, sem geradores customizados) — o ganho real é isolar contratos compartilhados e permitir cache de build local via Turborepo, não criar cerimônia.
4. **Escopo de 19 etapas é grande.** Risco de scope creep dentro de cada etapa. _Mitigação_: seguir estritamente a regra do `CLAUDE.md` — uma etapa por vez, sem antecipar funcionalidade futura além de fundações inevitáveis.
5. **i18n desde o início adiciona complexidade a todo componente de texto.** _Mitigação_: campos localizados simples (`{ 'pt-BR': string; 'en-US': string }`) só onde há texto voltado ao visitante; nenhuma biblioteca de i18n pesada até haver necessidade real (ex. roteamento por locale) — detalhado em `content-model.md`.
6. **Posts servidos pela API em vez de gerados estaticamente no build do front.** Escolha deliberada para manter fonte única de conteúdo e permitir agregação no Activity Feed; o custo é uma dependência de rede a mais para carregar um post. Aceitável dado cache HTTP + `staleTime` alto.

---

## Validações desta etapa

Etapa de discovery/documentação — não há código de aplicação para rodar `lint`/`typecheck`/`test`/`build`. Nenhum comando aplicável ainda; a fundação de tooling é criada na ETAPA 02, quando essas validações passam a ser exigidas.
