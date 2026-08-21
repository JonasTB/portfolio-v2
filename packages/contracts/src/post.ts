import { z } from 'zod';

export const postMetadataSchema = z.object({
  slug: z.string(),
  locale: z.enum(['pt-BR', 'en-US']),
  translationSlug: z.string().optional(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  coverImage: z.string().optional(),
  draft: z.boolean().optional(),
});

export type PostMetadata = z.infer<typeof postMetadataSchema>;

export const postListItemSchema = postMetadataSchema.extend({
  readingTime: z.number(),
});

export type PostListItem = z.infer<typeof postListItemSchema>;

export const postSchema = postListItemSchema.extend({
  html: z.string(),
});

export type Post = z.infer<typeof postSchema>;
