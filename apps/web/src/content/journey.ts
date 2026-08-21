import type { JourneyMilestone } from '@portfolio/contracts';

/**
 * Conteúdo local e temporário — Journey reaproveita Experience
 * (content-model.md) via `relatedExperienceId`, mas ainda não tem módulo
 * de API próprio. Todos os marcos abaixo são fatos reais fornecidos pelo
 * dono do portfólio (educação confirmada na ETAPA 06, carreira confirmada
 * na ETAPA 07 — ver apps/api/src/content/experience.ts).
 */
export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'birth',
    date: '1999',
    title: {
      'pt-BR': 'Nasceu em Fortaleza, Ceará',
      'en-US': 'Born in Fortaleza, Ceará',
    },
    description: {
      'pt-BR': 'O início de tudo, no Brasil.',
      'en-US': 'Where it all started, in Brazil.',
    },
    kind: 'milestone',
  },
  {
    id: 'high-school',
    date: '2017',
    title: {
      'pt-BR': 'Concluiu o ensino médio',
      'en-US': 'Finished high school',
    },
    description: {
      'pt-BR': 'O passo antes de decidir seguir para Ciência da Computação.',
      'en-US': 'The step before deciding to pursue Computer Science.',
    },
    kind: 'education',
  },
  {
    id: 'cs-degree',
    date: '2018–2023',
    title: {
      'pt-BR': 'Graduação em Ciência da Computação — Unifor',
      'en-US': 'Computer Science degree — Unifor',
    },
    description: {
      'pt-BR': 'Universidade de Fortaleza. Foi aqui que a paixão por backend nasceu.',
      'en-US': 'Universidade de Fortaleza. This is where the passion for backend was born.',
    },
    kind: 'education',
  },
  {
    id: 'career-start',
    date: '2019',
    title: {
      'pt-BR': 'Começou a carreira em desenvolvimento',
      'en-US': 'Started a development career',
    },
    description: {
      'pt-BR':
        'Primeiro estágio como full-stack developer, ainda durante a graduação, na própria Unifor.',
      'en-US':
        'First internship as a full-stack developer, still during the degree, at Unifor itself.',
    },
    kind: 'role',
    relatedExperienceId: 'unifor-estagio',
  },
  {
    id: 'tech-lead',
    date: '2025',
    title: {
      'pt-BR': 'Tornou-se Tech Lead',
      'en-US': 'Became Tech Lead',
    },
    description: {
      'pt-BR': 'Passou a liderar o time técnico na Teddy Open Finance.',
      'en-US': 'Started leading the technical team at Teddy Open Finance.',
    },
    kind: 'role',
    relatedExperienceId: 'teddy-tech-lead',
  },
  {
    id: 'portfolio-2026',
    date: '2026',
    title: {
      'pt-BR': 'Reconstruindo o portfólio pessoal',
      'en-US': 'Rebuilding the personal portfolio',
    },
    description: {
      'pt-BR': 'Um monorepo novo, React, NestJS — e esta timeline sendo escrita agora.',
      'en-US': 'A new monorepo, React, NestJS — and this very timeline being written now.',
    },
    kind: 'milestone',
  },
];
