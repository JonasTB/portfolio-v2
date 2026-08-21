import { z } from 'zod';
import { localizedTextSchema } from './localized-text.js';

const caseStudySchema = z.object({
  problem: localizedTextSchema,
  context: localizedTextSchema,
  solution: localizedTextSchema,
  architecture: localizedTextSchema.optional(),
  decisions: localizedTextSchema.optional(),
  challenges: localizedTextSchema.optional(),
  outcome: localizedTextSchema.optional(),
  screenshots: z.array(z.string()).optional(),
});

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: localizedTextSchema,
  longDescription: localizedTextSchema.optional(),
  role: localizedTextSchema,
  technologies: z.array(z.string()),
  image: z.string().optional(),
  repository: z.string().optional(),
  website: z.string().optional(),
  status: z.enum(['active', 'archived', 'concept']),
  featured: z.boolean(),
  year: z.number(),
  category: z.enum(['professional', 'personal', 'open-source', 'experiment']),
  /** Data real de início/atualização relevante, usada pelo Activity Feed. Nunca inventada. */
  publishedAt: z.string().optional(),
  caseStudy: caseStudySchema.optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectCaseStudy = z.infer<typeof caseStudySchema>;
