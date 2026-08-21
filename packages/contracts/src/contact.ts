import { z } from 'zod';

export const contactRequestSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  subject: z.string().min(1).max(160),
  message: z.string().min(1).max(2000),
  /** Honeypot anti-spam: sempre vazio para humanos, nunca exibido na UI. */
  honeypot: z.string().max(200).optional(),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;
