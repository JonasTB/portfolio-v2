# Comandos prontos para usar no Claude Code

## Primeiro contato

```text
Leia integralmente o CLAUDE.md e todos os documentos que ele referencia. Analise também as duas imagens em docs/references/. Não implemente nada ainda. Depois me diga apenas: (1) o que você entendeu sobre o produto, (2) quais arquivos/regras governam a execução e (3) se está pronto para iniciar a ETAPA 01.
```

## Executar uma etapa

Use:

```text
Execute a ETAPA 01.
```

Depois:

```text
Execute a ETAPA 02.
```

E assim por diante.

## Se quiser revisar antes de avançar

```text
Antes de avançarmos, revise criticamente o resultado desta etapa comparando com CLAUDE.md, PRODUCT_BRIEF.md, VISUAL_DIRECTION.md e os critérios da etapa atual. Corrija apenas problemas da etapa atual e rode novamente as validações aplicáveis. Não avance de etapa.
```

## Se o visual ficar genérico

```text
A solução visual está genérica. Reavalie docs/VISUAL_DIRECTION.md e as imagens do portfólio antigo. Preserve o DNA visual sem copiar o layout. Reduza padrões de template, grids repetitivos e aparência de SaaS. Quero mais composição editorial, tipografia, espaço, hierarquia e personalidade discreta. Não altere requisitos funcionais.
```

## Se exagerar nos easter eggs

```text
Os easter eggs estão chamando atenção demais. Trate-os como assinatura pessoal secundária. Quem não conhece a referência deve enxergar apenas um portfólio profissional. Reduza presença visual sem remover completamente o conceito.
```

## Se o Claude tentar implementar LinkedIn por scraping

```text
Pare essa abordagem. O projeto proíbe scraping do LinkedIn. Volte para a abstração de ProfessionalNetworkProvider, implemente LocalProfessionalProfileProvider como fallback/source of truth e só use integração LinkedIn através de API oficial e permissões realmente disponíveis.
```

## Para checagem técnica

```text
Audite esta etapa como um Staff Engineer. Procure acoplamento desnecessário, abstrações prematuras, dependências sem uso, problemas de type safety, segurança, acessibilidade, performance e manutenção. Corrija apenas problemas comprováveis e mantenha a solução simples.
```

## Para finalizar uma etapa

```text
Finalize a etapa atual. Rode lint, typecheck, testes e build aplicáveis. Corrija erros causados pelas mudanças. Depois me entregue um resumo curto com arquivos alterados, decisões relevantes, comandos, envs e pendências. Não avance para a próxima etapa.
```
