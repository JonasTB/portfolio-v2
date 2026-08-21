# Technical Architecture

## Objetivo técnico

Criar um projeto moderno, sólido e simples o suficiente para um portfólio pessoal, sem transformar o produto em uma arquitetura enterprise desnecessária.

---

# Frontend

Utilizar:

- React;
- TypeScript;
- Vite;
- Tailwind CSS;
- versões stable atuais e compatíveis no momento da implementação.

Avaliar apenas quando houver benefício real:

- React Router;
- TanStack Query;
- Zod;
- React Hook Form;
- Motion;
- Lucide;
- Radix UI;
- shadcn/ui como fonte de primitives, não como identidade visual pronta.

## Estado

Preferência:

1. estado local;
2. URL state;
3. server state com TanStack Query;
4. Context quando necessário;
5. state manager somente se surgir necessidade concreta.

Não instalar Redux/Zustand por padrão.

---

# Backend

Utilizar:

- Node.js;
- NestJS;
- TypeScript.

Arquitetura:

**Modular Monolith**.

Não usar microservices.

Organizar por domínio/feature.

Estrutura conceitual:

```text
modules/
  profile/
  projects/
  posts/
  activity/
  integrations/
    github/
    linkedin/
  contact/
  health/
```

Cada módulo pode conter, quando necessário:

```text
controller
application/service
domain
infrastructure
dto
```

Aplicar Clean Architecture, SOLID, dependency inversion, baixo acoplamento e alta coesão de forma pragmática.

Evitar excesso de interfaces ou camadas sem benefício.

---

# Monorepo

Preferir para projeto novo:

- pnpm workspaces;
- Turborepo.

Estrutura conceitual:

```text
portfolio/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── contracts/
│   ├── config/
│   └── ui/
├── docs/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

Criar somente packages realmente usados.

---

# Contracts

Evitar duplicação manual de interfaces entre frontend e backend.

Quando fizer sentido, utilizar:

```text
packages/contracts
```

Zod pode ser usado para schemas compartilhados.

Não expor entidades internas diretamente através da API.

---

# Conteúdo como dado

Conteúdo não deve ficar espalhado em JSX.

Estrutura conceitual:

```text
content/
├── profile.ts
├── experience.ts
├── projects.ts
├── interests.ts
├── social.ts
└── posts/
```

Pode existir no frontend, backend ou package compartilhado conforme a arquitetura decidida na ETAPA 01.

Componentes devem renderizar conteúdo, não ser o banco de dados do conteúdo.

---

# GitHub

Criar integração real via API oficial do GitHub.

Backend conceitual:

```text
IntegrationsModule
└── GithubModule
```

Abstração:

```ts
interface GithubProvider
```

Informações possíveis:

- perfil;
- repositories;
- estrelas;
- linguagens;
- repos selecionados;
- atividade pública quando disponível e útil.

Regras:

- tokens apenas no backend;
- cache para reduzir chamadas;
- timeout;
- tratamento de erro;
- fallback para conteúdo local;
- indisponibilidade do GitHub nunca quebra o site.

Não transformar Home em dashboard de métricas do GitHub.

---

# LinkedIn / Professional data

NÃO fazer scraping.

NÃO automatizar leitura de HTML.

NÃO usar bibliotecas não oficiais para contornar limitações.

Antes de implementar, verificar a documentação oficial atual do LinkedIn e as permissões efetivamente disponíveis para a aplicação.

Criar contrato desacoplado, por exemplo:

```ts
interface ProfessionalNetworkProvider {
  getProfile(): Promise<ProfessionalProfile>;
  getExperiences(): Promise<Experience[]>;
  getPosts(): Promise<Post[]>;
}
```

Possíveis providers:

```text
LocalProfessionalProfileProvider
LinkedinProvider
```

O provider local é o fallback/source of truth quando a API oficial não permitir determinado dado.

Também pode existir uma ferramenta opcional para importar dados a partir de arquivo exportado e fornecido manualmente pelo dono do portfólio.

O frontend não deve saber se os dados vieram de LinkedIn, arquivo local ou outra fonte.

---

# Activity Feed

Criar modelo normalizado conceitual:

```ts
type Activity = {
  id: string;
  type: string;
  source: string;
  title: string;
  description?: string;
  url?: string;
  createdAt: string;
};
```

`ActivityService` pode agregar:

- GitHub;
- posts;
- projects;
- Lab;
- LinkedIn quando oficialmente disponível.

Ordenar cronologicamente e tratar falhas parciais.

---

# Contact API

Endpoint conceitual:

```text
POST /api/v1/contact
```

Campos:

```text
name
email
subject
message
```

Criar provider desacoplado:

```ts
interface MailProvider
```

Possíveis implementações:

- Resend;
- AWS SES;
- Postmark.

Não acoplar domínio a um fornecedor.

## Segurança

Implementar:

- validação;
- limites de tamanho;
- sanitização adequada;
- rate limiting;
- honeypot;
- proteção anti-spam;
- logs sem dados sensíveis desnecessários;
- Cloudflare Turnstile somente se houver necessidade.

Nunca expor credenciais no frontend.

---

# NestJS bootstrap

Configurar quando aplicável:

- global prefix `/api`;
- versionamento `/v1`;
- `ValidationPipe`;
- whitelist;
- forbidNonWhitelisted;
- transform;
- CORS configurável e restritivo;
- Helmet;
- rate limiting;
- exception handling consistente;
- structured logging;
- correlation/request id;
- graceful shutdown;
- Swagger em desenvolvimento;
- health endpoint.

Rotas conceituais:

```text
/api/v1/profile
/api/v1/projects
/api/v1/posts
/api/v1/activity
/api/v1/contact
/api/v1/integrations/github
/health
```

---

# Environment

Variáveis devem ser tipadas e validadas.

Exemplo conceitual:

```text
PORT
WEB_URL
GITHUB_USERNAME
GITHUB_TOKEN
CONTACT_EMAIL
WHATSAPP_NUMBER
WHATSAPP_DEFAULT_MESSAGE
MAIL_PROVIDER
RESEND_API_KEY
LINKEDIN_CLIENT_ID
LINKEDIN_CLIENT_SECRET
```

Adicionar somente as realmente utilizadas.

Manter `.env.example` sem segredos.

---

# Performance

Prioridades:

- imagens otimizadas;
- lazy loading;
- code splitting quando adequado;
- bundle enxuto;
- fonts otimizadas;
- evitar dependências grandes;
- cache HTTP;
- evitar skeletons desnecessários.

Meta razoável de Lighthouse:

```text
Performance >= 95
Accessibility >= 95
Best Practices >= 95
SEO >= 95
```

---

# SEO

Implementar:

- title;
- description;
- canonical;
- Open Graph;
- social cards;
- sitemap;
- robots.txt;
- JSON-LD;
- Person schema;
- Article/Project schema quando aplicável;
- metadata por post/projeto.

---

# Acessibilidade

Seguir boas práticas WCAG.

Garantir:

- navegação por teclado;
- focus states;
- aria labels;
- contraste;
- reduced motion;
- alt text;
- semantic HTML;
- headings corretos.

---

# Testes

Frontend:

- Vitest;
- React Testing Library.

Backend:

- Jest ou runner compatível adotado pelo ecossistema Nest;
- Supertest para endpoints relevantes.

E2E:

- Playwright.

Priorizar comportamento.

Testar especialmente:

- navegação;
- contato;
- validações;
- provider fallbacks;
- GitHub integration;
- tema;
- links críticos.

---

# Qualidade e scripts

Configurar:

- ESLint;
- Prettier;
- TypeScript strict;
- EditorConfig;
- lint;
- typecheck;
- tests;
- build.

Scripts desejados:

```text
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
```

Evitar `any` e `eslint-disable` sem justificativa.

---

# CI

GitHub Actions:

```text
install
↓
lint
↓
typecheck
↓
test
↓
build
```

Executar em Pull Requests.

---

# Deploy

Manter arquitetura portátil.

Frontend pode ser hospedado em:

- Vercel;
- Cloudflare Pages;
- AWS/CDN;
- outro static hosting adequado.

Backend pode ser:

- Railway;
- Render;
- Fly;
- AWS;
- container equivalente.

Criar Dockerfile da API.

Não criar infraestrutura AWS complexa sem necessidade concreta.

---

# Observabilidade

Para este projeto, implementar somente o necessário:

- logs estruturados;
- erros de integrações;
- health endpoint;
- error boundaries no frontend.

Sentry é opcional.

---

# Analytics

Opcional.

Se necessário, priorizar solução privacy-friendly e evitar tracking invasivo.
