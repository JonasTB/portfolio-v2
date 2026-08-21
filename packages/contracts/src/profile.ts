import { z } from 'zod';
import { localizedTextSchema } from './localized-text.js';
import { socialLinksSchema } from './social-links.js';
import { interestsSchema } from './interests.js';

export const profileSchema = z.object({
  name: z.string(),
  role: localizedTextSchema,
  tagline: localizedTextSchema,
  shortBio: localizedTextSchema,
  photo: z.string().optional(),
  location: z.string(),
  specialties: z.array(z.string()),
  currently: z.object({
    building: localizedTextSchema.optional(),
    learning: localizedTextSchema.optional(),
    exploring: localizedTextSchema.optional(),
  }),
  professional: z.object({
    paragraphs: z.array(localizedTextSchema),
  }),
  interests: interestsSchema,
  resumeUrl: z.string().optional(),
  social: socialLinksSchema,
});

export type Profile = z.infer<typeof profileSchema>;
