# syntax=docker/dockerfile:1
#
# Build de produção da API (@portfolio/api) a partir da raiz do monorepo.
# Contexto de build esperado: raiz do repositório.
#   docker build -f apps/api/Dockerfile -t portfolio-api .
#
# Usa `turbo prune` para extrair apenas o subgrafo de dependências de
# @portfolio/api (que inclui @portfolio/contracts e @portfolio/config),
# evitando copiar/instalar o que pertence só a apps/web.

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

# ---- 1. Prune: calcula o subgrafo de workspace necessário para a api ----
FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo@2.10.11
COPY . .
RUN turbo prune @portfolio/api --docker

# ---- 2. Install + build: instala só as deps podadas e builda ----
FROM base AS installer
WORKDIR /app
RUN pnpm add -g turbo@2.10.11

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
RUN turbo run build --filter=@portfolio/api
RUN pnpm prune --prod

# ---- 3. Runtime: só o necessário para rodar `node dist/main.js` ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs

COPY --from=installer /app .

USER nestjs

EXPOSE 3000
ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --spider http://localhost:${PORT}/health || exit 1

CMD ["node", "apps/api/dist/main.js"]
