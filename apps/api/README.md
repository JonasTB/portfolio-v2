# @portfolio/api

Backend do portfólio — NestJS 11, modular monolith, prefixo `/api`, versionamento `/v1`. Fonte de verdade do conteúdo estruturado (perfil, experiência, projetos, posts, lab, activity), integração real com a API do GitHub e formulário de contato.

Ver o [README na raiz do monorepo](../../README.md) para instruções de setup, scripts e documentação completa. Deploy documentado em [`docs/deployment.md`](../../docs/deployment.md).

## Scripts locais

```bash
pnpm dev          # nest start --watch (localhost:3000)
pnpm build        # nest build
pnpm start:prod   # node dist/main
pnpm test         # jest
pnpm test:e2e     # jest --config test/jest-e2e.json
pnpm lint
pnpm typecheck
```
