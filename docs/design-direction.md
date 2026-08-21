# Design Direction — Decisões da ETAPA 01

Síntese da análise de `docs/references/portfolio-old-light.png` e `portfolio-old-dark.png`, traduzida em direção para o novo design. **Não define tokens finais** (cores, espaçamento exatos) — isso é objeto da ETAPA 03. Aqui fica registrado o que a análise revelou e qual direção seguir.

## O que a análise das imagens mostrou

Portfólio antigo: single-page densa, header com wordmark + ícone estilo Vader (referência nerd no branding) + nav de 3 itens (Works, Posts, Sources) + toggle de tema no canto, hero curto com título bold enorme + foto redonda pequena ao lado, corpo organizado em blocos sequenciais (Work / Bio / Passion / On the web) cada um com título sublinhado grosso, um único CTA em botão pill (verde-água), lista de links sociais simples com ícone + handle. Light em bege/off-white quente; dark em quase-preto com acentos ciano/magenta pontuais. Tipografia sans bold carrega quase toda a personalidade — pouquíssimo elemento decorativo.

## O que preservar (DNA, não pixels)

- minimalismo — poucos elementos, nada decorativo por decoração;
- hierarquia por peso tipográfico, não por ornamento;
- foto pessoal integrada de forma simples, não como banner de herói genérico;
- navegação enxuta e direta;
- ícone/símbolo nerd discreto no branding (mantém a linhagem do ícone estilo Vader do portfólio antigo, adaptado à nova identidade — não uma cópia);
- dark como modo de identidade forte, light com peso editorial equivalente, nunca invertido mecanicamente;
- sensação de site autoral, não de produto corporativo.

## O que precisa evoluir de fato

O antigo é essencialmente **uma página só, com blocos empilhados**. O novo é um produto com storytelling e múltiplas seções (Home, About, Journey, Work, Projects, Posts, Lab, Contact) — a evolução central é de **densidade de informação em bloco único** para **composição editorial distribuída em jornada**, com:

- grid e espaçamento com respiro real (o antigo é compacto por necessidade de caber tudo numa tela; o novo tem espaço para cada seção respirar);
- hierarquia por página, não só por bloco — cada rota tem seu próprio clímax visual;
- cards não-uniformes (`VISUAL_DIRECTION.md` já proíbe grade repetitiva) — misturar bloco editorial, timeline, lista e destaque assimétrico conforme o conteúdo pede, especialmente em Projects e Journey;
- micro-interações (hover, reveal, underline animado, transição de tema) onde o antigo era estático;
- profundidade de conteúdo por página (case studies, timeline de carreira, posts) onde o antigo tinha só texto corrido curto.

## Direção estética

```text
editorial + software engineer + produto premium + personalidade nerd discreta
```

Não é um dashboard, não é uma landing de SaaS, não é um tema "dev portfolio" de template. A referência mental é mais **revista/editorial de produto técnico** do que **página de currículo**.

## Tipografia — direção (tokens exatos na ETAPA 03)

- famílias: manter **poucas** (2, no máximo 3 contando um mono para trechos de código/easter eggs) — o antigo já mostrava que peso tipográfico > variedade de fontes;
- títulos com contraste de peso forte (o antigo já faz isso bem — evoluir mantendo, não abandonando);
- fonte mono reservada a contexto de código/terminal (`Currently` status, blocos de código dos posts) — não vira tema geral do site;
- priorizar fontes open source ou de altíssima qualidade de renderização web (variable fonts preferíveis por performance).

## Cor — direção (proposta formal de accent na ETAPA 03)

Sem paleta grande. O antigo usa 1 accent quente/verde-água no light e ciano/magenta pontuais no dark — pista de que a marca pessoal já tolera **um accent vibrante mas single**, não uma paleta multi-cor. ETAPA 03 deve propor 1–2 direções de accent color (candidatas a explorar: um único accent consistente entre light/dark vs. accents distintos por tema como o antigo já sugere) e justificar por legibilidade, personalidade, consistência dark/light e acessibilidade (contraste WCAG AA mínimo).

## Cards e composição

Evitar replicar a lista simples de blocos do antigo 1:1. Aplicar o que `VISUAL_DIRECTION.md` já define: misturar blocos editoriais, listas, timeline, cards assimétricos e destaques — especialmente em Projects (não cair em grid uniforme 3-colunas genérico) e Journey (timeline narrativa, não lista de datas).

## Animação

Reforçar hierarquia e resposta, nunca decorar por decorar: entrada suave, underline/hover, reveal de projeto, transição de tema, transições de página discretas. Sem parallax, sem elementos voando, sem página que só fica utilizável após animação terminar. `prefers-reduced-motion` respeitado em toda a superfície animada.

## Easter eggs — leitura do antigo

O ícone estilo Vader no branding do antigo já é exatamente o tom certo: presente, mas só reconhecível por quem conhece a referência. Novo site mantém esse princípio como regra geral (`PRODUCT_BRIEF.md` já formaliza isso) — o símbolo do branding é o easter egg mais visível e permanente; os demais (command palette, console message, 404, Konami) são descobertas extras, não repetidos em todo componente.

## Mobile

Direção mobile-first vale desde o design: o antigo é responsivo mas claramente pensado desktop-first e comprimido (ver reflow simples nas duas imagens). O novo precisa de composição própria para mobile em pelo menos hero, timeline (Journey) e grid de projetos — não apenas breakpoint reduzindo colunas.

---

## O que fica para a ETAPA 03

- tokens finais de cor (light + dark), com 1–2 propostas de accent e justificativa;
- escala tipográfica, pesos, ritmo vertical;
- espaçamento, radius, sombra, transições como tokens;
- primitives de UI (`Button`, `Card`, `Heading` etc.) e página de validação do design system.
