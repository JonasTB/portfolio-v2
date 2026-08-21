import { z } from 'zod';

export const githubProfileSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatarUrl: z.string(),
  bio: z.string().nullable(),
  url: z.string(),
});

export const githubRepositorySchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  url: z.string(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  stars: z.number(),
  topics: z.array(z.string()),
  updatedAt: z.string().nullable(),
});

export const githubIntegrationSchema = z.object({
  profile: githubProfileSchema,
  repositories: z.array(githubRepositorySchema),
  topLanguages: z.array(z.string()),
});

export type GithubProfile = z.infer<typeof githubProfileSchema>;
export type GithubRepository = z.infer<typeof githubRepositorySchema>;
export type GithubIntegration = z.infer<typeof githubIntegrationSchema>;
