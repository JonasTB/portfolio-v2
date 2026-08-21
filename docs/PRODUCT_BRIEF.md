# Product Brief — Novo Portfólio Pessoal

## Objetivo

Construir um portfólio moderno que apresente de maneira clara e humana:

- quem sou;
- o que faço;
- minha trajetória;
- experiências profissionais;
- projetos;
- conhecimentos técnicos;
- publicações;
- atividade recente;
- GitHub;
- LinkedIn quando oficialmente possível;
- interesses pessoais;
- formas de contato;
- currículo;
- pequenos easter eggs relacionados à minha personalidade.

O visitante deve conseguir entender em menos de 30 segundos:

> Quem é essa pessoa, o que ela faz, em que é boa e como entrar em contato.

## Sensação desejada

A experiência deve combinar:

- minimalismo sofisticado;
- identidade própria;
- engenharia de software;
- editorial;
- produto digital premium;
- personalidade nerd discreta;
- ótima tipografia;
- excelente uso de espaço;
- microinterações discretas.

Evitar aparência de:

- template genérico de portfólio;
- dashboard SaaS;
- currículo HTML;
- landing page de startup;
- cyberpunk exagerado;
- página gamer;
- excesso de gradientes;
- excesso de glassmorphism;
- dezenas de cores;
- grade interminável de cards.

## Navegação sugerida

```text
Home
About
Journey
Work
Projects
Posts
Lab
Contact
```

Pode adaptar os nomes se uma solução de UX for melhor, desde que a informação continue clara.

---

# Home

A Home deve causar boa primeira impressão sem exagero visual.

Hero conceitual:

```text
Jonas Timbáuba
Software Engineer / Full-stack Developer

Building products, systems and experiences.
```

O texto real deve ser configurável.

Incluir:

- foto;
- headline;
- descrição curta;
- principais especialidades;
- CTA para projetos;
- CTA de contato;
- GitHub;
- LinkedIn;
- currículo;
- preview de projetos em destaque;
- preview de atividade recente;
- detalhe pessoal/easter egg discreto.

Não colocar um enorme bloco de biografia no hero.

---

# Currently / Now

Criar uma área pequena mostrando contexto atual.

Exemplos:

```text
Currently building
Currently learning
Currently exploring
```

Conteúdo deve ser facilmente editável.

Pode ter leve linguagem visual de terminal, mas sem transformar o site em tema hacker.

---

# About

Separar a apresentação entre dois eixos.

## Professional

- carreira;
- visão de produto;
- engenharia;
- tipos de problema que gosto de resolver;
- maneira de trabalhar.

## Personal

- música;
- instrumentos;
- séries;
- filmes;
- games;
- cultura nerd;
- tecnologia;
- outros interesses que eu decidir adicionar.

Essa seção pode concentrar alguns easter eggs.

---

# Journey

Criar uma timeline elegante contando uma história, não apenas datas.

Pode conter:

- educação;
- primeiro emprego;
- mudanças profissionais;
- cargos;
- momentos importantes;
- projetos relevantes;
- marcos técnicos.

---

# Work / Experience

Cada experiência pode conter:

- empresa;
- função;
- período;
- contexto;
- responsabilidades;
- impacto;
- tecnologias;
- projetos relacionados.

Priorizar impacto, decisões e narrativa em vez de uma lista extensa de atividades.

---

# Projects

Modelo conceitual:

```ts
{
  (slug,
    title,
    description,
    longDescription,
    role,
    technologies,
    image,
    repository,
    website,
    status,
    featured,
    year);
}
```

Possíveis categorias:

- Professional
- Personal
- Open Source
- Experiments

Os cards não devem ser idênticos e repetitivos. Explorar composição editorial, tamanhos e hierarquias diferentes.

Projetos relevantes poderão ter case study em:

```text
/projects/:slug
```

Case study pode incluir:

- problema;
- contexto;
- solução;
- arquitetura;
- decisões técnicas;
- desafios;
- resultado;
- screenshots;
- links.

---

# Posts

Criar:

```text
/posts
/posts/:slug
```

Conteúdo:

- artigos;
- opiniões técnicas;
- aprendizados;
- notas;
- publicações.

Preferir Markdown ou MDX como fonte inicial.

Suportar:

- metadata;
- tags;
- data;
- reading time;
- syntax highlighting;
- SEO;
- social preview.

---

# Lab

Criar:

```text
/lab
```

Área para coisas em construção ou experimentação:

- provas de conceito;
- IA;
- automações;
- UI experiments;
- estudos;
- ferramentas;
- ideias incompletas.

Pode ser visualmente um pouco mais experimental que o restante do site.

---

# Stack / Technologies

Não criar uma nuvem genérica com dezenas de logos.

Mostrar contexto.

Exemplo:

```text
Daily
Frequently
Exploring
```

Ou relacionar tecnologias diretamente aos projetos e experiências em que foram usadas.

Priorizar contexto sobre quantidade.

---

# Recent Activity

Criar um feed unificado de atividade recente.

Exemplos:

```text
Published article
Created repository
Updated project
Started experimenting with ...
```

Possíveis fontes:

- GitHub;
- Posts locais;
- Projects;
- Lab;
- LinkedIn quando oficialmente disponível.

O feed deve ser uma forma de mostrar movimento sem depender do LinkedIn como fonte única.

---

# Contact

Contato deve ser simples e imediato.

Disponibilizar:

- WhatsApp;
- e-mail;
- LinkedIn;
- GitHub;
- formulário opcional.

## WhatsApp

Criar CTA para `wa.me` com mensagem pré-programada e configurável.

Mensagem conceitual:

```text
Olá Jonas! Encontrei seu contato através do seu portfólio e gostaria de conversar sobre...
```

Não espalhar telefone hardcoded em vários componentes.

## Email

Oferecer:

- `mailto:`;
- formulário via backend.

Campos:

```text
name
email
subject
message
```

---

# Currículo

Adicionar CTA claro:

```text
Download CV
```

Path deve ser centralizado em configuração.

---

# Internacionalização

Preparar para:

```text
pt-BR
en-US
```

Se implementado desde o início, utilizar seletor discreto e persistir preferência.

Não adicionar complexidade excessiva apenas por i18n.

---

# Dark / Light

Suportar:

```text
system
dark
light
```

Persistir preferência e evitar flash incorreto de tema.

Dark deve ser a experiência visual principal, mas light deve ser igualmente bem projetado.

---

# Command Palette

Avaliar uma command palette:

```text
CMD + K
CTRL + K
```

Possíveis comandos:

- Go to Projects
- Go to Posts
- Open GitHub
- Open LinkedIn
- Contact me
- Download CV
- Change theme

Pode conter uma ação secreta relacionada ao easter egg.

---

# Easter eggs

A cultura nerd deve funcionar como assinatura, não como tema.

Referência histórica: o portfólio antigo usava um pequeno ícone inspirado em Darth Vader.

Possibilidades:

- pequeno símbolo no branding;
- interação no logo;
- mensagem discreta ao ativar dark mode;
- `Join the dark side` na command palette;
- Konami Code;
- página 404 temática;
- mensagem no console;
- microanimação rara;
- tooltip inesperado.

Evitar:

- grandes artes de franquias;
- espaço sideral no fundo;
- sabres em toda interface;
- referências em todos os componentes.

Regra:

> Quem não conhece minhas referências deve enxergar apenas um excelente portfólio. Quem conhece deve perceber os detalhes.

Ao usar marcas, personagens ou artes de franquias, priorizar assets fornecidos por mim ou materiais cuja licença permita o uso. Evitar reproduzir propriedade intelectual desnecessariamente.
