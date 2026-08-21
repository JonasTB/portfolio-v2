import type { Experience } from '@portfolio/contracts';

/**
 * Cópia local da experiência (mesma fonte que apps/api/src/content/experience.ts).
 * Usada como `initialData` da query — a página Work nunca fica em branco,
 * mesmo se a API estiver indisponível.
 */
export const experienceFallback: Experience[] = [
  {
    id: 'teddy-tech-lead',
    company: 'Teddy Open Finance',
    role: { 'pt-BR': 'Tech Lead', 'en-US': 'Tech Lead' },
    period: { start: '2025-11' },
    location: 'São Bernardo do Campo, SP · Remoto',
    context: {
      'pt-BR':
        'Evoluiu de Full Stack Engineer para a liderança técnica do time na Teddy Open Finance.',
      'en-US':
        'Grew from Full Stack Engineer into technical leadership of the team at Teddy Open Finance.',
    },
    impact: [
      {
        'pt-BR': 'Lidera o time técnico com foco em soluções escaláveis e de alto impacto.',
        'en-US': 'Leads the technical team with a focus on scalable, high-impact solutions.',
      },
      {
        'pt-BR':
          'Une boas práticas de engenharia a uma cultura colaborativa, com atenção a arquitetura limpa e qualidade de código.',
        'en-US':
          'Combines strong engineering practices with a collaborative culture, with a focus on clean architecture and code quality.',
      },
    ],
    technologies: ['NestJS', 'Node.js', 'React', 'Git'],
  },
  {
    id: 'teddy-fullstack',
    company: 'Teddy Open Finance',
    role: { 'pt-BR': 'Full Stack Engineer', 'en-US': 'Full Stack Engineer' },
    period: { start: '2024-11', end: '2025-11' },
    context: {
      'pt-BR': 'Entrada na Teddy Open Finance como desenvolvedor full-stack.',
      'en-US': 'Joined Teddy Open Finance as a full-stack developer.',
    },
    impact: [
      {
        'pt-BR': 'Desenvolvimento full-stack com prática de TDD.',
        'en-US': 'Full-stack development with a TDD practice.',
      },
    ],
    technologies: ['TDD', 'NestJS', 'React'],
  },
  {
    id: 'solution4fleet',
    company: 'Solution4Fleet (Santander)',
    role: { 'pt-BR': 'Full Stack Developer', 'en-US': 'Full Stack Developer' },
    period: { start: '2023-04', end: '2024-11' },
    location: 'São Paulo, SP · Híbrido',
    context: {
      'pt-BR': 'Solution4Fleet, empresa do grupo Santander voltada à gestão de frotas.',
      'en-US': 'Solution4Fleet, a Santander group company focused on fleet management.',
    },
    impact: [
      {
        'pt-BR': 'Desenvolvimento full-stack em modelo híbrido.',
        'en-US': 'Full-stack development in a hybrid work model.',
      },
    ],
    technologies: ['MongoDB', 'SQL'],
  },
  {
    id: 'fortbrasil',
    company: 'FortBrasil',
    role: { 'pt-BR': 'Full Stack Developer', 'en-US': 'Full Stack Developer' },
    period: { start: '2022-11', end: '2023-03' },
    location: 'Fortaleza, CE',
    context: {
      'pt-BR': 'Desenvolvimento full-stack na FortBrasil, em Fortaleza.',
      'en-US': 'Full-stack development at FortBrasil, in Fortaleza.',
    },
    impact: [
      {
        'pt-BR': 'Contribuições full-stack em produtos existentes.',
        'en-US': 'Full-stack contributions to existing products.',
      },
    ],
    technologies: ['MongoDB', 'SQL'],
  },
  {
    id: 'cartao-vai-bem',
    company: 'Cartão Vai Bem',
    role: { 'pt-BR': 'Full Stack Engineer', 'en-US': 'Full Stack Engineer' },
    period: { start: '2022-07', end: '2022-11' },
    location: 'Fortaleza, CE',
    context: {
      'pt-BR': 'Desenvolvimento full-stack na Cartão Vai Bem, empresa de cartões, em Fortaleza.',
      'en-US': 'Full-stack development at Cartão Vai Bem, a card-services company, in Fortaleza.',
    },
    impact: [
      {
        'pt-BR': 'Desenvolvimento full-stack com NestJS e Flutter.',
        'en-US': 'Full-stack development with NestJS and Flutter.',
      },
    ],
    technologies: ['NestJS', 'Flutter'],
  },
  {
    id: 'unifor-trainee',
    company: 'Universidade de Fortaleza (Unifor)',
    role: {
      'pt-BR': 'Full-stack Developer e Liferay (Trainee)',
      'en-US': 'Full-stack Developer & Liferay (Trainee)',
    },
    period: { start: '2021-07', end: '2022-06' },
    location: 'Fortaleza, CE',
    context: {
      'pt-BR': 'Evolução do estágio para uma posição de trainee, ainda na própria universidade.',
      'en-US': 'Grew from the internship into a trainee position, still at the university itself.',
    },
    impact: [
      {
        'pt-BR': 'Desenvolvimento full-stack e trabalho com a plataforma Liferay.',
        'en-US': 'Full-stack development and work with the Liferay platform.',
      },
    ],
    technologies: ['MongoDB', 'SQL', 'Liferay'],
  },
  {
    id: 'unifor-estagio',
    company: 'Universidade de Fortaleza (Unifor)',
    role: { 'pt-BR': 'Full-stack Developer (Estágio)', 'en-US': 'Full-stack Developer (Intern)' },
    period: { start: '2019-11', end: '2021-07' },
    location: 'Fortaleza, CE',
    context: {
      'pt-BR':
        'Primeira experiência profissional em desenvolvimento, durante a graduação na própria Unifor.',
      'en-US': 'First professional development experience, during the degree at Unifor itself.',
    },
    impact: [
      {
        'pt-BR': 'Início da carreira em desenvolvimento full-stack.',
        'en-US': 'Start of a full-stack development career.',
      },
    ],
    technologies: ['MongoDB', 'SQL'],
  },
];
