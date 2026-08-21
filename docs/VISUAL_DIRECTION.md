# Visual Direction

## Referências disponíveis

Antes de propor o novo design, analise:

- `docs/references/portfolio-old-light.png`
- `docs/references/portfolio-old-dark.png`

Essas imagens representam o portfólio anterior.

Elas são **referência de identidade**, não um layout para ser copiado.

## O que preservar conceitualmente

- minimalismo;
- navegação simples;
- forte uso de tipografia;
- foto pessoal integrada ao layout;
- boa leitura de conteúdo;
- dark/light mode;
- poucos elementos decorativos;
- ícone nerd discreto no branding;
- sensação de site pessoal e autoral.

## O que precisa evoluir

- composição;
- grid;
- hierarquia;
- espaçamento;
- tipografia;
- responsividade;
- storytelling;
- projetos;
- experiência profissional;
- posts;
- atividade recente;
- contato;
- animações;
- microinterações;
- polish geral.

O resultado deve parecer uma evolução de vários anos do portfólio antigo.

## Direção estética

Combinar:

```text
editorial
+
software engineer
+
produto premium
+
personalidade nerd discreta
```

O site não deve parecer um template pronto.

## Dark mode

Dark mode é a experiência principal.

Utilizar aproximadamente:

- fundo quase preto, mas não preto absoluto em todas as áreas;
- grafite para superfícies;
- off-white para texto principal;
- cinzas para texto secundário;
- uma cor de destaque principal;
- uma segunda cor apenas quando necessária.

Evitar neon excessivo.

## Light mode

Manter conexão com o antigo portfólio através de:

- off-white;
- bege muito discreto;
- cinzas quentes;
- ótimo contraste;
- sensação editorial.

Não criar o light mode apenas invertendo as cores do dark.

## Cor

Não definir uma paleta enorme inicialmente.

Na ETAPA 03, propor de 1 a 2 direções de accent color e justificar considerando:

- legibilidade;
- personalidade;
- dark/light;
- consistência;
- acessibilidade.

Depois escolher uma direção e implementá-la com design tokens.

## Tipografia

A tipografia deve carregar boa parte da personalidade visual.

Prioridades:

- legibilidade;
- títulos fortes;
- ótimo ritmo vertical;
- contraste de pesos;
- poucas famílias tipográficas;
- boa renderização web.

Preferir fontes open source ou system fonts de qualidade.

## Cards

Evitar grade uniforme de cartões para tudo.

Misturar quando fizer sentido:

- blocos editoriais;
- listas;
- timelines;
- cards assimétricos;
- destaques de projeto;
- texto com screenshots;
- links contextuais.

## Animação

Animação deve reforçar hierarquia e resposta da interface.

Exemplos aceitáveis:

- entrada suave;
- transições de página discretas;
- underline;
- hover;
- reveal de projeto;
- theme transition;
- pequenos detalhes do easter egg.

Evitar:

- parallax exagerado;
- animação constante;
- elementos voando;
- delays que atrapalham leitura;
- páginas que só ficam utilizáveis após animações longas.

Respeitar `prefers-reduced-motion`.

## Mobile

Desenvolver mobile-first.

Validar ao menos:

```text
320
375
390
768
1024
1280
1440
1920
```

Não simplesmente comprimir a versão desktop. Quando necessário, criar composição própria para mobile.
