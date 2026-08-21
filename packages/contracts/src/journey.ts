import { z } from 'zod';
import { localizedTextSchema } from './localized-text.js';

export const journeyMilestoneSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: localizedTextSchema,
  description: localizedTextSchema,
  kind: z.enum(['education', 'role', 'project', 'milestone']),
  relatedExperienceId: z.string().optional(),
  relatedProjectSlug: z.string().optional(),
});

export type JourneyMilestone = z.infer<typeof journeyMilestoneSchema>;
