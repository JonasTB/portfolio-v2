import { profileSchema } from '@portfolio/contracts';
import type { Profile } from '@portfolio/contracts';

/**
 * Fonte de verdade do perfil (ETAPA 05/06). `photo` e `resumeUrl` ficam
 * ausentes até que os arquivos reais sejam fornecidos — o frontend
 * degrada graciosamente (iniciais no lugar de foto, sem CTA de CV quebrado).
 *
 * `professional` é um rascunho honesto a partir do que é verificável
 * (educação, paixão por backend) — sem inventar empregador ou projeto.
 * A seção de interesses pessoais (About) foi removida na ETAPA 19 por
 * decisão do dono do portfólio, em vez de preencher com placeholder.
 */
const rawProfile: Profile = {
  name: 'Jonas Timbaúba',
  role: {
    'pt-BR': 'Engenheiro de Software / Full-stack Developer',
    'en-US': 'Software Engineer / Full-stack Developer',
  },
  tagline: {
    'pt-BR': 'Construindo produtos, sistemas e experiências.',
    'en-US': 'Building products, systems and experiences.',
  },
  shortBio: {
    'pt-BR':
      'Engenheiro de software com raiz em backend, mas confortável em frontend. Gosto de resolver problemas de sistema com clareza e simplicidade.',
    'en-US':
      'Backend-leaning software engineer, equally comfortable in the frontend. I like solving system problems with clarity and simplicity.',
  },
  location: 'Fortaleza, Brasil',
  specialties: ['Backend', 'Frontend', 'System Design'],
  currently: {
    building: {
      'pt-BR': 'Este portfólio',
      'en-US': 'This portfolio',
    },
  },
  professional: {
    paragraphs: [
      {
        'pt-BR':
          'Sou formado em Ciência da Computação pela Unifor (Universidade de Fortaleza) e venho construindo minha carreira com raiz forte em backend, sem abrir mão de me sentir confortável no frontend quando o problema pede.',
        'en-US':
          "I hold a Computer Science degree from Unifor (Universidade de Fortaleza) and I've been building my career with strong backend roots, while staying comfortable in the frontend when the problem calls for it.",
      },
      {
        'pt-BR':
          'Gosto de pensar em produto além do código: entender por que algo está sendo construído importa tanto quanto como. Prefiro soluções simples que resolvem o problema real a arquiteturas elaboradas que só impressionam no papel.',
        'en-US':
          'I like thinking about product beyond code: understanding why something is being built matters as much as how. I prefer simple solutions that solve the real problem over elaborate architectures that only impress on paper.',
      },
      {
        'pt-BR':
          'Os problemas que mais me atraem envolvem sistemas — modelagem de dados, integrações, decisões de arquitetura que precisam envelhecer bem. Trabalho de forma incremental, documentando decisões e validando cedo.',
        'en-US':
          'The problems I enjoy most involve systems — data modeling, integrations, architecture decisions that need to age well. I work incrementally, documenting decisions and validating early.',
      },
    ],
  },
  social: {
    github: 'https://github.com/JonasTB',
    linkedin: 'https://www.linkedin.com/in/jonas-timba%C3%BAba-0357b21b8/',
    // `email` e `whatsapp` vêm de CONTACT_EMAIL/WHATSAPP_NUMBER (ver ProfileService) —
    // nunca hardcoded aqui, para não duplicar a mesma fonte de verdade do módulo contact.
  },
};

export const profile: Profile = profileSchema.parse(rawProfile);
