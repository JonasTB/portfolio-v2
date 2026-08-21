# Execution Plan — Etapas 01 a 19

## Regra

Executar uma etapa por vez. Ao concluir, validar o que foi feito e aguardar autorização para continuar.

---

# ETAPA 01 — Discovery e Arquitetura

Objetivo: entender e desenhar o projeto antes de programar.

Executar:

1. analisar o repositório;
2. registrar estado atual;
3. analisar as referências visuais;
4. propor arquitetura;
5. definir monorepo;
6. definir módulos;
7. definir contratos;
8. definir estratégia de conteúdo;
9. definir estratégia LinkedIn;
10. definir estratégia GitHub;
11. definir deploy;
12. identificar riscos e simplificações.

Criar/atualizar:

```text
docs/architecture.md
docs/content-model.md
docs/integrations.md
docs/design-direction.md
```

Não criar telas finais nesta etapa.

---

# ETAPA 02 — Bootstrap do Monorepo

Criar fundação do projeto.

Configurar:

- `apps/web`;
- `apps/api`;
- packages necessários;
- pnpm;
- Turborepo;
- TypeScript;
- lint;
- formatting;
- Vite;
- React;
- NestJS;
- Tailwind CSS.

Validar:

```text
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
```

---

# ETAPA 03 — Design System

Antes das páginas finais, definir:

- typography;
- colors;
- spacing;
- borders;
- radius;
- shadows;
- transitions;
- containers;
- breakpoints;
- dark/light tokens.

Criar primitives, conforme necessário:

```text
Button
Link
Container
Section
Heading
Badge
IconButton
Tooltip
Card
Avatar
Divider
```

Criar página temporária de Design System para validação visual.

---

# ETAPA 04 — App Shell

Construir:

- Header;
- Desktop Navigation;
- Mobile Navigation;
- Footer;
- Theme Switcher;
- Language Switcher preparado;
- layout base;
- routing;
- page transitions discretas.

Adicionar símbolo/ícone pessoal discreto no branding.

---

# ETAPA 05 — Home

Construir:

- Hero;
- fotografia;
- headline;
- descrição;
- CTA;
- social links;
- current status;
- featured projects;
- recent activity preview;
- pequeno detalhe pessoal/easter egg.

Priorizar impacto visual e clareza.

---

# ETAPA 06 — About + Journey

Construir:

```text
/about
/journey
```

Adicionar:

- apresentação profissional;
- interesses pessoais;
- timeline;
- education;
- career milestones.

Manter linguagem humana e visual editorial.

---

# ETAPA 07 — Experience / Work

Criar:

```text
/work
```

Implementar modelo de experiência e relacionar:

- empresas;
- períodos;
- responsabilidades;
- impacto;
- projetos;
- tecnologias;
- competências.

---

# ETAPA 08 — Projects

Construir:

```text
/projects
/projects/:slug
```

Criar:

- featured projects;
- filtros discretos se úteis;
- project cards editoriais;
- case studies.

Tailwind CSS deve ser o padrão obrigatório de estilização.

---

# ETAPA 09 — Posts

Construir:

```text
/posts
/posts/:slug
```

Adicionar Markdown/MDX e suporte a:

- metadata;
- tags;
- reading time;
- code blocks;
- syntax highlighting;
- SEO.

---

# ETAPA 10 — Lab

Construir:

```text
/lab
```

Suportar:

- experiment;
- status;
- technologies;
- link;
- repository.

Pode ser visualmente mais experimental sem quebrar a identidade geral.

---

# ETAPA 11 — GitHub Integration

Implementar backend de GitHub via API oficial.

Criar conceitos equivalentes a:

```text
GithubModule
GithubProvider
GithubService
```

Adicionar:

- cache;
- timeout;
- fallback;
- tratamento de erro.

Frontend deve mostrar somente informação realmente útil.

---

# ETAPA 12 — LinkedIn / Professional Data

Implementar contratos e providers.

Começar com:

```text
LocalProfessionalProfileProvider
```

Preparar arquitetura para:

```text
LinkedinProvider
```

Antes de qualquer chamada real, verificar a documentação oficial atual e implementar somente recursos autorizados.

Não fazer scraping.

Adicionar mecanismo opcional de importação a partir de exportação de dados fornecida manualmente.

---

# ETAPA 13 — Activity Feed

Criar agregador de atividades.

Agregar quando disponível:

- GitHub;
- posts;
- projects;
- Lab;
- LinkedIn oficial.

Normalizar eventos, ordenar cronologicamente e tolerar falhas parciais.

---

# ETAPA 14 — Contact

Construir interface de contato.

Adicionar:

- WhatsApp;
- e-mail;
- LinkedIn;
- GitHub;
- formulário.

WhatsApp deve utilizar `wa.me` com mensagem configurável.

No backend implementar:

- validação;
- rate limiting;
- anti-spam;
- provider de email;
- logs seguros.

---

# ETAPA 15 — Easter Eggs

Somente depois da experiência principal estar funcionando.

Adicionar poucos easter eggs muito bem executados.

Possibilidades:

- `CMD/CTRL + K` → `Join the dark side`;
- Konami Code;
- interação no logo;
- console message;
- 404 temática;
- secret theme.

Não comprometer UX, acessibilidade ou performance.

---

# ETAPA 16 — SEO + Performance + Accessibility

Auditar:

- metadata;
- sitemap;
- JSON-LD;
- images;
- fonts;
- bundle;
- keyboard;
- focus;
- contrast;
- reduced motion;
- semantic HTML.

Executar Lighthouse e corrigir problemas relevantes.

---

# ETAPA 17 — Testes

Criar cobertura adequada para fluxos críticos.

Validar:

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Tudo deve passar.

---

# ETAPA 18 — CI/CD e Deploy

Criar:

- GitHub Actions;
- Dockerfile API;
- documentação de deploy;
- documentação de env;
- build de produção.

Criar/atualizar:

```text
docs/deployment.md
```

---

# ETAPA 19 — Polimento Final

Revisar o produto inteiro como designer e engenheiro.

Perguntar:

- existe algo genérico?
- existem elementos repetitivos demais?
- há texto excessivo?
- o site possui personalidade?
- mobile está realmente bom?
- dark/light possuem qualidade equivalente?
- animações contribuem?
- navegação é clara?
- contato é simples?
- performance está boa?
- acessibilidade foi realmente tratada?
- os easter eggs estão discretos?
- o site transmite competência e personalidade?

Corrigir problemas encontrados.

---

# Critérios de aceitação final

- [ ] desktop bem resolvido;
- [ ] mobile bem resolvido;
- [ ] dark mode completo;
- [ ] light mode completo;
- [ ] Projects funcional;
- [ ] Posts funcional;
- [ ] GitHub integrado com fallback;
- [ ] LinkedIn arquitetado de forma oficial e segura;
- [ ] WhatsApp funcional;
- [ ] contato por email funcional;
- [ ] currículo acessível;
- [ ] easter eggs discretos;
- [ ] SEO configurado;
- [ ] sitemap configurado;
- [ ] acessibilidade validada;
- [ ] testes passando;
- [ ] lint passando;
- [ ] typecheck passando;
- [ ] production build passando;
- [ ] nenhuma chave privada no frontend;
- [ ] documentação atualizada.
