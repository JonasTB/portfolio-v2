import { z } from 'zod';
import { localizedTextSchema } from './localized-text.js';

export const socialLinksSchema = z.object({
  github: z.string().url(),
  linkedin: z.string().url().optional(),
  email: z.string().email().optional(),
  whatsapp: z
    .object({
      number: z.string(),
      defaultMessage: localizedTextSchema,
    })
    .optional(),
  twitter: z.string().url().optional(),
  instagram: z.string().url().optional(),
});

export type SocialLinks = z.infer<typeof socialLinksSchema>;
