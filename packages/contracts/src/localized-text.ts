import { z } from 'zod';

export const localizedTextSchema = z.object({
  'pt-BR': z.string(),
  'en-US': z.string(),
});

export type LocalizedText = z.infer<typeof localizedTextSchema>;
