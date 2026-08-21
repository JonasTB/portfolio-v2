# Deployment — ETAPA 18

## Visão geral

| Camada     | Onde roda           | Como builda                                        | Como implanta                                   |
| ---------- | ------------------- | -------------------------------------------------- | ----------------------------------------------- |
| `apps/web` | Vercel (estático)   | `vite build` (via `pnpm build`)                    | Integração Git nativa da Vercel                 |
| `apps/api` | Railway (container) | `apps/api/Dockerfile` (multi-stage, `turbo prune`) | Integração Git nativa da Railway (Docker-first) |

CI (GitHub Actions) é um **gate de qualidade em Pull Requests** — `install → lint → typecheck → format:check → test → test:e2e → build`, mais um job que builda a imagem Docker da API para garantir que o `Dockerfile` continua funcionando. Ele **não implanta nada**: Vercel e Railway têm integração nativa com o repositório Git e fazem deploy por conta própria a cada push (ver seções abaixo). Isso evita duplicar lógica de deploy em dois lugares — decisão consciente pela opção mais simples (`CLAUDE.md`: simplicidade > arquitetura).

Alternativas equivalentes documentadas em `docs/architecture.md`, caso Vercel/Railway deixem de ser adequados: Cloudflare Pages (web) e Render/Fly.io (api) — ambas recebem o mesmo artefato (build estático / imagem Docker), sem lock-in.

---

## GitHub Actions

Workflow: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).

- **Gatilhos**: todo Pull Request, e push direto em `main`.
- **Job `ci`**: `pnpm install --frozen-lockfile` → `lint` → `typecheck` → `format:check` → `test` (unit, web+api) → `test:e2e` (api) → `build` (web+api, via Turborepo).
- **Job `docker`** (depende de `ci` passar): builda `apps/api/Dockerfile` a partir da raiz do monorepo, sem publicar a imagem — só valida que o Dockerfile de produção continua buildando.
- Cache de dependências via `actions/setup-node` (pnpm store) — sem cache remoto do Turborepo por enquanto (execução solo, custo de configurar > benefício agora, conforme risco #3 de `docs/architecture.md`).

Nenhum secret é necessário para este workflow — ele não toca em GitHub API real, Resend, nem nada autenticado; os testes usam fallback/mocks.

---

## Dockerfile da API

`apps/api/Dockerfile`, contexto de build = **raiz do repositório** (precisa enxergar o monorepo inteiro para o `turbo prune` funcionar):

```bash
docker build -f apps/api/Dockerfile -t portfolio-api .
docker run -p 3000:3000 -e WEB_URL=http://localhost:5173 portfolio-api
```

Estratégia (multi-stage):

1. **pruner** — `turbo prune @portfolio/api --docker` extrai só o subgrafo de dependências da API (`@portfolio/api` + `@portfolio/contracts` + `@portfolio/config`), sem o que pertence exclusivamente a `apps/web`.
2. **installer** — instala as deps podadas (`pnpm install --frozen-lockfile`), builda (`turbo run build --filter=@portfolio/api`, que builda `@portfolio/contracts` antes por dependência) e remove devDependencies (`pnpm prune --prod`).
3. **runner** — imagem final `node:20-alpine`, usuário não-root (`nestjs`), só `node dist/main.js`. `HEALTHCHECK` bate em `GET /health` (rota fora do prefixo `/api`, ver `apps/api/src/main.ts`).

Validado localmente: build, `/health`, `/api/v1/profile` e `/api/v1/posts` (confirma que os `.md` de `src/content/posts` foram copiados para `dist` — `nest-cli.json` → `compilerOptions.assets`) respondem corretamente dentro do container.

### Bug corrigido nesta etapa

`apps/api/src/main.ts` importa `express` diretamente (`import { json } from 'express'`), mas `express` nunca esteve nas `dependencies` de `apps/api/package.json` — só chegava transitivamente via `@nestjs/platform-express`. Em dev (`nest start --watch`) isso não quebrava por causa de como o Nest CLI resolve módulos internamente, mas `node dist/main.js` (o que `start:prod` e o `Dockerfile` realmente executam) falhava com `Cannot find module 'express'`. Corrigido adicionando `express` como dependência direta em `apps/api/package.json`. Reproduzido e confirmado tanto localmente (`node dist/main.js`) quanto dentro do container antes do fix.

---

## Deploy — `apps/web` → Vercel

1. Importar o repositório GitHub no dashboard da Vercel.
2. Root Directory: `apps/web`.
3. Build Command: `cd ../.. && pnpm build --filter=@portfolio/web` (ou deixar a Vercel detectar via `vercel.json`, se criado futuramente — não criado nesta etapa por não ser necessário: o autodetect de monorepo pnpm da Vercel já lida com isso a partir do Root Directory).
4. Output Directory: `dist`.
5. Install Command: `pnpm install --frozen-lockfile` (executado na raiz do monorepo).
6. Variáveis de ambiente (Vercel → Project Settings → Environment Variables): ver tabela abaixo.
7. Preview deployments automáticos por PR já vêm de fábrica na Vercel — nenhuma configuração extra de CI necessária para isso.

## Deploy — `apps/api` → Railway

1. Novo serviço no Railway → "Deploy from GitHub repo".
2. Railway detecta o `Dockerfile` automaticamente se `Root Directory` = raiz do repo e `Dockerfile Path` = `apps/api/Dockerfile` (Settings → Build → Dockerfile Path). Contexto de build precisa ser a raiz do monorepo, não `apps/api/`.
3. Variáveis de ambiente (Railway → Variables): ver tabela abaixo.
4. Healthcheck path (Railway → Settings → Healthcheck): `/health`.
5. Porta: Railway injeta `PORT` automaticamente — `apps/api/src/main.ts` já lê `PORT` via `ConfigService`, então não precisa fixar.

---

## Variáveis de ambiente

Referência completa em [`.env.example`](../.env.example). Nunca commitar `.env` real (já no `.gitignore`).

### `apps/api` (Railway)

| Variável                                        | Obrigatória             | Descrição                                                                                                                                                                                          |
| ----------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PORT`                                          | não (Railway injeta)    | Porta HTTP. Default `3000`.                                                                                                                                                                        |
| `WEB_URL`                                       | **sim**                 | Origem permitida no CORS. Em produção, a URL pública do `apps/web` na Vercel.                                                                                                                      |
| `GITHUB_USERNAME`                               | sim (para GitHub real)  | Username usado pela `GithubModule`. Sem isso, cai no fallback local.                                                                                                                               |
| `GITHUB_TOKEN`                                  | sim (para GitHub real)  | Token da API oficial do GitHub (read-only). Sem isso, cai no fallback local.                                                                                                                       |
| `CONTACT_EMAIL`                                 | sim (para contato real) | E-mail de destino do formulário de contato.                                                                                                                                                        |
| `WHATSAPP_NUMBER`                               | sim                     | Número usado no link `wa.me`.                                                                                                                                                                      |
| `WHATSAPP_DEFAULT_MESSAGE`                      | não                     | Mensagem pré-preenchida do `wa.me`. Tem default no código.                                                                                                                                         |
| `MAIL_PROVIDER`                                 | não                     | Se vazio, `ContactModule` usa um provider "Unavailable" com graceful degradation — endpoint responde indicando que o envio por e-mail está temporariamente indisponível, sem quebrar o formulário. |
| `RESEND_API_KEY`                                | não (por decisão)       | Fica em branco por escolha do usuário — arquitetura pronta (`ResendMailProvider`), só falta a chave. Preencher quando decidir ativar envio de e-mail real.                                         |
| `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` | não                     | Só usar se uma integração oficial do LinkedIn for implementada (não é o caso hoje — ver `docs/integrations.md`).                                                                                   |

### `apps/web` (Vercel)

| Variável       | Obrigatória | Descrição                                                                                                                                                                       |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL` | sim         | Base URL da API em produção, ex. `https://api.<dominio>/api/v1`. Sem isso, cai no default `http://localhost:3000/api/v1` (`apps/web/src/lib/api.ts`), o que quebra em produção. |

---

## Domínio — pendente

`robots.txt` e `sitemap.xml` (`apps/web/public/`) usam o placeholder `https://jonastimbauba.example`, com comentário explícito no próprio `sitemap.xml` apontando para esta etapa. **Decisão explícita**: adiar a escolha do domínio real em vez de travar o CI/CD nisso.

Quando houver domínio de produção definido, atualizar:

1. `apps/web/public/robots.txt` — linha `Sitemap:`.
2. `apps/web/public/sitemap.xml` — todas as `<loc>`.
3. JSON-LD / canonical (`apps/web/src/components/seo/*`, `useDocumentHead`) — conferir se alguma URL absoluta usa o placeholder.
4. `WEB_URL` no Railway (CORS da API).
5. `VITE_API_URL` na Vercel, se o subdomínio da API mudar.
6. DNS: registro na raiz do domínio apontando para a Vercel; `api.<dominio>` (CNAME) apontando para o Railway.

---

## Checklist de aceitação desta etapa

- [x] GitHub Actions: `install → lint → typecheck → format:check → test → test:e2e → build`, rodando em PRs.
- [x] `apps/api/Dockerfile` criado, buildado e testado localmente (`/health`, `/api/v1/profile`, `/api/v1/posts`).
- [x] Bug de produção (`express` faltando como dependência direta) encontrado e corrigido antes de documentar o deploy — sem isso, `start:prod` e o container quebravam.
- [x] `docs/deployment.md` com documentação de deploy e variáveis de ambiente.
- [x] `pnpm build && pnpm lint && pnpm typecheck && pnpm test && pnpm format:check` e `pnpm --filter @portfolio/api test:e2e` passando.
- [ ] Domínio de produção real — adiado por decisão explícita (placeholder documentado acima).
- [ ] Primeiro deploy real na Vercel/Railway — depende de o usuário conectar as contas nos dashboards (fora do alcance de automação do Claude Code).
