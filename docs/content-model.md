# Content Model — Decisões da ETAPA 01

Fonte de verdade: `apps/api/src/content/*`, tipado e validado por schemas Zod em `packages/contracts`. O frontend nunca hardcoda texto de conteúdo em JSX — apenas renderiza o que recebe.

## Localização (pt-BR / en-US)

Sem biblioteca de i18n pesada nesta fase. Estratégia mínima:

```ts
type LocalizedText = {
  'pt-BR': string;
  'en-US': string;
};
```

Aplicado **somente** aos campos voltos ao visitante (headline, descrições, bios, títulos de projeto/post). Campos não-textuais (datas, tecnologias, links, slugs, imagens) permanecem locale-independentes — duplicá-los não agrega valor e só aumenta risco de divergência.

Posts são a exceção: um post é conteúdo longo, então **não** é traduzido campo a campo. Cada post tem um `locale` único e, opcionalmente, um `translationSlug` apontando para a versão no outro idioma quando ela existir. Não criar par obrigatório pt/en por post — trabalho i18n de posts é decidido texto a texto, não estrutural.

---

## Profile

```ts
type Profile = {
  name: string;
  role: LocalizedText; // ex.: "Software Engineer / Full-stack Developer"
  tagline: LocalizedText; // linha curta do hero, ex.: "Building products, systems and experiences."
  shortBio: LocalizedText; // 1–2 frases, não o bloco grande de biografia
  photo: string;
  location: string;
  specialties: string[]; // principais especialidades, curto
  currently: {
    building?: LocalizedText;
    learning?: LocalizedText;
    exploring?: LocalizedText;
  };
  resumeUrl: string; // caminho centralizado do CV
  social: SocialLinks; // ver abaixo
};
```

## SocialLinks

```ts
type SocialLinks = {
  github: string;
  linkedin: string;
  email: string;
  whatsapp?: {
    number: string; // E.164, nunca hardcoded em componentes
    defaultMessage: LocalizedText;
  };
  twitter?: string;
  instagram?: string;
};
```

`WHATSAPP_NUMBER` e `WHATSAPP_DEFAULT_MESSAGE` vêm de env (ver `.env.example`) e populam este objeto — nunca duplicados em múltiplos componentes.

## Experience (Work)

```ts
type Experience = {
  id: string;
  company: string;
  role: LocalizedText;
  period: { start: string; end?: string }; // ISO date; end ausente = atual
  context: LocalizedText; // por que essa posição/empresa
  impact: LocalizedText[]; // narrativa de impacto, não lista de tarefas
  technologies: string[];
  relatedProjectSlugs?: string[];
};
```

Prioriza narrativa e decisões (`context`, `impact`) sobre lista exaustiva de atividades, conforme `PRODUCT_BRIEF.md`.

## Journey (timeline)

Reaproveita `Experience` + entradas adicionais de marcos não-profissionais:

```ts
type JourneyMilestone = {
  id: string;
  date: string;
  title: LocalizedText;
  description: LocalizedText;
  kind: 'education' | 'role' | 'project' | 'milestone';
  relatedExperienceId?: string;
  relatedProjectSlug?: string;
};
```

## Project

Baseado no modelo conceitual do brief, tipado:

```ts
type Project = {
  slug: string;
  title: string;
  description: LocalizedText; // curta, usada em cards
  longDescription?: LocalizedText; // usada no case study
  role: LocalizedText;
  technologies: string[];
  image: string;
  repository?: string;
  website?: string;
  status: 'active' | 'archived' | 'concept';
  featured: boolean;
  year: number;
  category: 'professional' | 'personal' | 'open-source' | 'experiment';
  caseStudy?: {
    problem: LocalizedText;
    context: LocalizedText;
    solution: LocalizedText;
    architecture?: LocalizedText;
    decisions?: LocalizedText;
    challenges?: LocalizedText;
    outcome?: LocalizedText;
    screenshots?: string[];
  };
};
```

`caseStudy` só existe para projetos que têm `/projects/:slug` detalhado; projetos simples ficam só com os campos base.

## Post

Frontmatter + corpo Markdown/MDX, arquivo em `apps/api/src/content/posts/<slug>.mdx`:

```ts
type PostMetadata = {
  slug: string;
  locale: 'pt-BR' | 'en-US';
  translationSlug?: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  draft?: boolean;
};

type Post = PostMetadata & {
  html: string; // já processado pela API (remark/rehype + shiki)
  readingTime: number; // minutos
};
```

`draft: true` nunca é exposto em produção pela API (filtrado no service, não no frontend).

## Lab (experiment)

```ts
type LabExperiment = {
  slug: string;
  title: string;
  description: LocalizedText;
  status: 'idea' | 'in-progress' | 'shipped' | 'abandoned';
  technologies: string[];
  link?: string;
  repository?: string;
  updatedAt: string;
};
```

## Interests (Personal, usado em About)

```ts
type Interests = {
  music?: string[];
  instruments?: string[];
  series?: string[];
  films?: string[];
  games?: string[];
  other?: string[];
};
```

Conteúdo leve, usado para humanizar o About — sem necessidade de endpoint dedicado; pode viver dentro de `Profile` ou como parte do payload de `/api/v1/profile`.

## Activity (agregador)

Já definido em `TECHNICAL_ARCHITECTURE.md`, reafirmado aqui como parte do content model:

```ts
type Activity = {
  id: string;
  type: string; // 'repo_created' | 'post_published' | 'project_updated' | ...
  source: 'github' | 'posts' | 'projects' | 'lab' | 'linkedin';
  title: string;
  description?: string;
  url?: string;
  createdAt: string;
};
```

Gerado no backend combinando as fontes disponíveis; falha de uma fonte (ex. GitHub fora do ar) não derruba as demais.

## Contact

```ts
type ContactRequest = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
```

Validado por Zod tanto no `React Hook Form` do frontend quanto no `ValidationPipe` da API (mesmo schema de `packages/contracts`).

---

## Onde cada schema mora

Todos os tipos acima são definidos como schemas Zod em `packages/contracts/src/*`, com o tipo TS inferido (`z.infer<...>`) exportado junto. `apps/api` importa para validar entrada/saída; `apps/web` importa só o tipo (sem revalidar payload confiável do próprio backend).
