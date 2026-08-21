import { z } from 'zod';
import { localizedTextSchema } from './localized-text.js';

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: localizedTextSchema,
  period: z.object({
    start: z.string(),
    end: z.string().optional(),
  }),
  location: z.string().optional(),
  context: localizedTextSchema,
  impact: z.array(localizedTextSchema),
  technologies: z.array(z.string()),
  relatedProjectSlugs: z.array(z.string()).optional(),
});

export type Experience = z.infer<typeof experienceSchema>;
