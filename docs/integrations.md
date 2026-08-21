# Integrations — Decisões da ETAPA 01

## GitHub

Integração real via **API oficial do GitHub** (REST v3 ou GraphQL v4), exclusivamente no backend.

```text
modules/integrations/github/
  github.module.ts
  github.controller.ts
  github.service.ts
  github.provider.ts     # interface GithubProvider — implementação concreta injetável
```

```ts
interface GithubProvider {
  getProfile(): Promise<GithubProfile>;
  getSelectedRepositories(): Promise<GithubRepository[]>;
  getPublicActivity(): Promise<GithubEvent[]>;
}
```

Regras:

- token (`GITHUB_TOKEN`) só existe no backend, nunca chega ao frontend;
- **cache** com TTL curto (ex.: 15–30 min) para não bater na rate limit da API e reduzir latência;
- **timeout** agressivo (ex.: 5s) nas chamadas externas;
- em falha (timeout, erro, rate limit): **fallback para conteúdo local** curado (lista estática de repositórios em destaque, mantida em `content/`) — o site nunca quebra por o GitHub estar indisponível;
- frontend recebe só o que é útil (perfil resumido, repositórios selecionados, linguagens principais) — **nunca vira dashboard de métricas** na Home.

`GET /api/v1/integrations/github` expõe esse resultado já agregado e com fallback aplicado — o frontend não sabe se veio da API real ou do fallback local.

---

## LinkedIn / Professional Network

**Proibido scraping. Proibido automatizar leitura de HTML. Proibido lib não-oficial para contornar limitação.**

### Situação real do acesso oficial

A API do LinkedIn para dados de perfil/experiência/posts (`r_liteprofile` legado, Profile API, Posts API) é, na prática, restrita a **parceiros aprovados pelo LinkedIn** através de programas específicos (Marketing Developer Platform, Talent/Learning partners etc.). Para uma aplicação pessoal de portfólio, é muito improvável obter esse acesso sem aprovação formal do LinkedIn. Antes de qualquer implementação de `LinkedinProvider`, é obrigatório revisitar a [documentação oficial do LinkedIn Developer Platform](https://learn.microsoft.com/en-us/linkedin/) vigente no momento e confirmar concretamente quais escopos estão disponíveis para a aplicação — não assumir acesso.

### Arquitetura (independente do resultado dessa checagem)

```ts
interface ProfessionalNetworkProvider {
  getProfile(): Promise<ProfessionalProfile>;
  getExperiences(): Promise<Experience[]>;
  getPosts(): Promise<Post[]>;
}
```

```text
modules/integrations/linkedin/
  linkedin.module.ts
  professional-network.provider.ts        # interface
  local-professional-profile.provider.ts  # implementação real, ativa desde já
  linkedin.provider.ts                    # implementação oficial — condicional, adiada
```

- **`LocalProfessionalProfileProvider`** é implementado desde já e tratado como **fonte de verdade real**, não um fallback teórico — na prática é o provider que roda em produção. Os dados vêm do `content-model.md` (`Experience[]`, `Profile`) já definido para a API.
- **`LinkedinProvider`** fica arquitetado (interface pronta, módulo com injeção condicional) mas **não implementado** até confirmação de acesso oficial viável (ETAPA 12 revisita isso). Se não houver acesso disponível, o provider oficial simplesmente nunca é ativado — o site continua funcionando 100% via provider local.
- Import manual opcional: ferramenta (CLI/script interno, não exposta publicamente) para importar dados a partir de um arquivo de exportação de dados do LinkedIn (o próprio usuário baixa via configurações do LinkedIn) e popular `content/experience.ts` — mantém dado atualizado sem violar termos de uso.
- Seleção do provider ativo via `LINKEDIN_CLIENT_ID`/`LINKEDIN_CLIENT_SECRET` presentes ou não em env — ausência das envs = `LocalProfessionalProfileProvider` é o único registrado no módulo (nem tenta instanciar o oficial).
- **O frontend nunca sabe** de onde o dado veio — consome só a forma normalizada (`ProfessionalProfile`, `Experience[]`, `Post[]`).

---

## Contact / Mail Provider

```ts
interface MailProvider {
  send(payload: ContactRequest): Promise<void>;
}
```

Candidato inicial: **Resend** (DX simples, boa entrega, SDK TypeScript nativo) — configurável via `MAIL_PROVIDER=resend` + `RESEND_API_KEY`. Alternativas equivalentes (AWS SES, Postmark) plugáveis atrás da mesma interface sem tocar no domínio de contato.

Segurança do endpoint `/api/v1/contact` (implementação na ETAPA 14, arquitetura já prevista aqui):

- validação estrita de payload (Zod, `packages/contracts`);
- limite de tamanho de payload;
- sanitização de input;
- rate limiting por IP;
- honeypot field;
- logs sem dado sensível (nunca logar corpo completo da mensagem com PII em texto livre além do necessário).

---

## Activity aggregation

`ActivityService` (módulo `activity`) combina, no backend:

| source     | disponível desde                | observação                                               |
| ---------- | ------------------------------- | -------------------------------------------------------- |
| `posts`    | sempre (local)                  | publicação de novo post vira evento                      |
| `projects` | sempre (local)                  | criação/atualização de projeto vira evento               |
| `lab`      | sempre (local)                  | novo experimento vira evento                             |
| `github`   | condicional                     | usa `GithubProvider`; ausência de dado não quebra o feed |
| `linkedin` | condicional, geralmente inativo | só entra se `LinkedinProvider` oficial estiver ativo     |

Falha parcial de qualquer fonte é isolada (try/catch por fonte) — o feed sempre retorna o que conseguiu agregar, ordenado cronologicamente, nunca falha inteiro por causa de uma fonte externa.

---

## Resumo de risco (ver também `docs/architecture.md`)

O maior risco de integração deste projeto é assumir prematuramente que a API oficial do LinkedIn estará disponível. A arquitetura acima garante que essa suposição, se falsa, **não bloqueia nada** — o portfólio funciona plenamente só com GitHub oficial + provider local do LinkedIn.
