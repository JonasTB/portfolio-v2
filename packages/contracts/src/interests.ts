import { z } from 'zod';

export const interestsSchema = z.object({
  music: z.array(z.string()).optional(),
  instruments: z.array(z.string()).optional(),
  series: z.array(z.string()).optional(),
  films: z.array(z.string()).optional(),
  games: z.array(z.string()).optional(),
  other: z.array(z.string()).optional(),
});

export type Interests = z.infer<typeof interestsSchema>;
