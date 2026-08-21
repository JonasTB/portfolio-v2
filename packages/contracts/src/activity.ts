import { z } from 'zod';
import { localizedTextSchema } from './localized-text.js';

export const activitySourceSchema = z.enum(['github', 'posts', 'projects', 'lab', 'linkedin']);

export const activitySchema = z.object({
  id: z.string(),
  type: z.string(),
  source: activitySourceSchema,
  title: localizedTextSchema,
  url: z.string().optional(),
  createdAt: z.string(),
});

export type ActivitySource = z.infer<typeof activitySourceSchema>;
export type Activity = z.infer<typeof activitySchema>;
