import type { Project } from '@portfolio/contracts';

/**
 * Cópia local dos projetos (mesma fonte que apps/api/src/content/projects.ts).
 * Usada como `initialData` das queries — as páginas de Projects nunca
 * ficam em branco, mesmo se a API estiver indisponível.
 */
export const projectsFallback: Project[] = [
  {
    slug: 'portfolio',
    title: 'Portfolio pessoal',
    description: {
      'pt-BR': 'Este site — monorepo pnpm/Turborepo, React e NestJS, construído com Claude Code.',
      'en-US': 'This site — a pnpm/Turborepo monorepo, React and NestJS, built with Claude Code.',
    },
    longDescription: {
      'pt-BR':
        'Substituição completa do portfólio antigo por uma experiência mais editorial e profissional, mantendo o DNA visual original (minimalismo, tipografia forte, referência nerd discreta) mas evoluindo composição, storytelling e engenharia.',
      'en-US':
        'A full replacement of the old portfolio with a more editorial, professional experience — keeping the original visual DNA (minimalism, strong typography, discreet nerd reference) while evolving composition, storytelling and engineering.',
    },
    role: {
      'pt-BR': 'Concepção e direção técnica — implementado com Claude Code, etapa por etapa',
      'en-US': 'Concept and technical direction — implemented with Claude Code, step by step',
    },
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'NestJS',
      'pnpm',
      'Turborepo',
      'TanStack Query',
      'Zod',
    ],
    status: 'active',
    featured: true,
    year: 2026,
    category: 'personal',
    caseStudy: {
      problem: {
        'pt-BR':
          'O portfólio antigo era uma página única, densa, sem arquitetura de conteúdo, sem case studies e sem integração técnica real — não comunicava a senioridade nem a trajetória atual.',
        'en-US':
          "The old portfolio was a single dense page, with no content architecture, no case studies and no real technical integration — it didn't communicate current seniority or trajectory.",
      },
      context: {
        'pt-BR':
          'Construído via Claude Code seguindo um plano de execução em 19 etapas numeradas, definido em CLAUDE.md, com documentos de produto, direção visual e arquitetura técnica lidos antes de qualquer implementação.',
        'en-US':
          'Built via Claude Code following a 19-step numbered execution plan defined in CLAUDE.md, with product, visual direction and technical architecture documents read before any implementation.',
      },
      solution: {
        'pt-BR':
          'Monorepo pnpm/Turborepo com frontend React/Vite e backend NestJS como fonte de verdade do conteúdo, expondo tudo via REST. Design system com tokens de cor/tipografia/espaçamento, dark/light sem flash, i18n pt-BR/en-US, e componentes acessíveis (Radix UI) por trás de primitives próprios.',
        'en-US':
          'pnpm/Turborepo monorepo with a React/Vite frontend and a NestJS backend as the content source of truth, exposed via REST. A design system with color/typography/spacing tokens, flash-free dark/light theming, pt-BR/en-US i18n, and accessible components (Radix UI) behind custom primitives.',
      },
      architecture: {
        'pt-BR':
          'Conteúdo estruturado (perfil, experiência, projetos) mora na API e é validado por schemas Zod compartilhados em packages/contracts — o mesmo schema tipa a resposta do backend e o consumo no frontend. O frontend nunca fica em branco: cada hook de dados usa uma cópia local como initialData, então a API cair não quebra a página.',
        'en-US':
          'Structured content (profile, experience, projects) lives in the API and is validated by Zod schemas shared through packages/contracts — the same schema types the backend response and the frontend consumption. The frontend never goes blank: every data hook uses a local copy as initialData, so the API going down never breaks the page.',
      },
      decisions: {
        'pt-BR':
          'TypeScript fixado em 6.0.3 (não a versão mais nova) porque o typescript-eslint ainda não suporta a major seguinte — "mutuamente compatível" venceu "mais novo". Nenhum dado de experiência profissional ou projeto foi inventado: quando faltou informação real (histórico de trabalho, outros projetos), o processo parou e perguntou em vez de preencher com placeholder plausível.',
        'en-US':
          'TypeScript pinned at 6.0.3 (not the newest release) because typescript-eslint doesn\'t support the next major yet — "mutually compatible" won over "newest". No work history or project content was ever invented: when real information was missing (job history, other projects), the process stopped and asked instead of filling in a plausible-sounding placeholder.',
      },
      challenges: {
        'pt-BR':
          'O compilador de watch do NestJS CLI não resolve `extends` de tsconfig via especificador de pacote — só caminho relativo funciona, algo descoberto só depois de um `nest start --watch` compilar silenciosamente sem emitir nada. O cache incremental do TypeScript também mordeu: um `rm -rf dist` sem limpar o `.tsbuildinfo` fazia o compilador achar que nada tinha mudado.',
        'en-US':
          "NestJS CLI's watch compiler doesn't resolve tsconfig `extends` via a package specifier — only a relative path works, discovered only after a `nest start --watch` silently compiled without emitting anything. TypeScript's incremental cache bit too: a `rm -rf dist` without clearing `.tsbuildinfo` made the compiler think nothing had changed.",
      },
      outcome: {
        'pt-BR':
          'Em construção — fundação, design system, app shell, Home, About, Journey, Work e Projects (esta própria página) já implementados e validados; Posts, Lab, integrações e polimento final seguem nas próximas etapas.',
        'en-US':
          'Work in progress — foundation, design system, app shell, Home, About, Journey, Work and Projects (this very page) are already implemented and validated; Posts, Lab, integrations and final polish are still ahead.',
      },
    },
  },
];
