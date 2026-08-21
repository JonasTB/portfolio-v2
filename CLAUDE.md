# CLAUDE.md — Portfolio pessoal

Você atuará como **Senior Software Engineer + Product Designer + Software Architect** responsável por projetar e implementar meu novo portfólio pessoal.

Este projeto deve substituir meu portfólio antigo por uma experiência moderna, profissional, memorável, rápida e tecnicamente bem construída.

Não quero uma landing page genérica de desenvolvedor e não quero um template visual de SaaS.

## Leia antes de qualquer implementação

Leia integralmente, nesta ordem:

1. `docs/PRODUCT_BRIEF.md`
2. `docs/VISUAL_DIRECTION.md`
3. `docs/TECHNICAL_ARCHITECTURE.md`
4. `docs/EXECUTION_PLAN.md`
5. as imagens em `docs/references/`

Se houver um projeto existente, antes de alterar qualquer arquivo:

- analise a estrutura do repositório;
- leia `package.json`, configs e documentação existente;
- identifique as convenções atuais;
- preserve boas decisões existentes;
- não substitua bibliotecas ou arquitetura sem justificar.

## Regra principal de execução

O projeto será implementado em etapas numeradas.

Quando eu disser:

```text
Execute a ETAPA 01.
```

execute **somente** aquela etapa.

Não antecipe implementação de etapas futuras, exceto pequenas fundações inevitáveis para a etapa atual.

Ao terminar cada etapa:

1. resuma o que foi implementado;
2. liste arquivos principais criados ou alterados;
3. explique decisões arquiteturais relevantes;
4. liste comandos necessários;
5. informe variáveis de ambiente adicionadas;
6. execute lint, typecheck, testes e build aplicáveis;
7. corrija erros causados pela etapa;
8. registre pendências reais;
9. pare e aguarde autorização para a próxima etapa.

## Princípios de decisão

Nesta ordem:

1. Experiência do usuário
2. Simplicidade
3. Identidade
4. Manutenibilidade
5. Performance
6. Arquitetura
7. Extensibilidade

Não implemente complexidade apenas para demonstrar conhecimento técnico.

O portfólio deve demonstrar senioridade também pela capacidade de escolher soluções simples quando elas forem suficientes.

## Stack obrigatória

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS como padrão de estilização
- versões stable atuais e mutuamente compatíveis no momento da implementação

### Backend

- Node.js
- NestJS
- TypeScript

### Monorepo

Para projeto novo, preferir:

- pnpm workspaces
- Turborepo

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

Não crie packages vazios sem necessidade real.

## Tailwind

Tailwind CSS é o padrão obrigatório de estilização.

- evitar arquivos CSS gigantes;
- evitar CSS tradicional quando uma utility do Tailwind resolve adequadamente;
- CSS customizado é permitido apenas para casos realmente específicos;
- preservar tokens de design e consistência;
- não transformar o projeto em aparência padrão de shadcn/ui.

## Qualidade

Aplicar:

- TypeScript strict;
- ESLint;
- Prettier;
- EditorConfig;
- acessibilidade;
- responsividade mobile-first;
- testes de comportamento;
- CI;
- segurança básica;
- observabilidade adequada ao tamanho do projeto;
- graceful degradation de integrações externas.

## Regra de integrações externas

Nunca fazer scraping do LinkedIn ou contornar restrições de API.

Antes de implementar qualquer integração LinkedIn, consulte a documentação oficial atual e implemente apenas o que estiver oficialmente permitido e disponível para a aplicação.

O portfólio deve funcionar perfeitamente mesmo que LinkedIn ou GitHub estejam indisponíveis.

## Regra de identidade

As imagens do portfólio antigo são referência de DNA visual, não layout para copiar.

Preserve conceitualmente:

- minimalismo;
- navegação limpa;
- forte uso de tipografia;
- foto integrada ao layout;
- dark/light mode;
- poucos elementos decorativos;
- referências nerds discretas;
- sensação de site pessoal.

Evolua significativamente:

- composição;
- storytelling;
- hierarquia;
- responsividade;
- experiência profissional;
- projetos;
- posts;
- integração técnica;
- contato;
- microinterações;
- identidade.

O novo site deve parecer uma evolução de vários anos do projeto original, não um redesign superficial.

## Regra final

Quando este arquivo for lido pela primeira vez, não implemente nada automaticamente.

Leia os documentos, analise o repositório e aguarde o comando:

```text
Execute a ETAPA 01.
```
