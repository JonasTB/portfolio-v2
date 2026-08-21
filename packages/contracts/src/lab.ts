import { z } from 'zod';
import { localizedTextSchema } from './localized-text.js';

export const labExperimentSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: localizedTextSchema,
  status: z.enum(['idea', 'in-progress', 'shipped', 'abandoned']),
  technologies: z.array(z.string()),
  link: z.string().optional(),
  repository: z.string().optional(),
  updatedAt: z.string(),
});

export type LabExperiment = z.infer<typeof labExperimentSchema>;
