// `PostsService` real puxa a pipeline de markdown (unified/remark/rehype),
// que é ESM-only e quebra o Jest em modo CommonJS. Mock por factory (não
// automock) para nunca sequer carregar o módulo real — o teste já injeta
// seu próprio fake de qualquer forma.
jest.mock('../posts/posts.service.js', () => ({ PostsService: jest.fn() }));

import { ActivityService } from './activity.service.js';
import type { PostsService } from '../posts/posts.service.js';
import type { ProjectsService } from '../projects/projects.service.js';
import type { LabService } from '../lab/lab.service.js';
import type { GithubService } from '../integrations/github/github.service.js';
import type { LinkedinProvider } from '../integrations/linkedin/linkedin.provider.js';
import type { PostListItem, Project, LabExperiment, GithubIntegration } from '@portfolio/contracts';

const post = {
  slug: 'meu-post',
  title: 'Meu post',
  date: '2026-08-10',
} as unknown as PostListItem;

const project = {
  slug: 'portfolio',
  title: 'Portfolio pessoal',
  publishedAt: '2026-08-20',
} as unknown as Project;

const experiment = {
  slug: 'experimento',
  title: 'Experimento',
  updatedAt: '2026-08-15',
} as unknown as LabExperiment;

const githubIntegration = {
  profile: {} as GithubIntegration['profile'],
  repositories: [
    { name: 'repo-x', url: 'https://github.com/x/repo-x', updatedAt: '2026-08-05' },
  ] as GithubIntegration['repositories'],
  topLanguages: [],
};

function buildService(overrides: {
  postsService?: Partial<PostsService>;
  projectsService?: Partial<ProjectsService>;
  labService?: Partial<LabService>;
  githubService?: Partial<GithubService>;
  linkedinProvider?: Partial<LinkedinProvider>;
  env?: Record<string, string | undefined>;
}) {
  const config = { get: (key: string) => overrides.env?.[key] };
  return new ActivityService(
    { getAll: () => [post], ...overrides.postsService } as PostsService,
    { getAll: () => [project], ...overrides.projectsService } as unknown as ProjectsService,
    { getAll: () => [experiment], ...overrides.labService },
    {
      getIntegration: () => Promise.resolve(githubIntegration),
      ...overrides.githubService,
    } as unknown as GithubService,
    {
      getPosts: () => Promise.reject(new Error('não deveria ser chamado')),
      ...overrides.linkedinProvider,
    } as unknown as LinkedinProvider,
    config as never,
  );
}

describe('ActivityService', () => {
  it('aggregates every source and sorts the feed by createdAt, most recent first', async () => {
    const service = buildService({});

    const feed = await service.getFeed();

    expect(feed.map((item) => item.source)).toEqual(['projects', 'lab', 'posts', 'github']);
    expect(feed.map((item) => item.createdAt)).toEqual([
      '2026-08-20',
      '2026-08-15',
      '2026-08-10',
      '2026-08-05',
    ]);
  });

  it('tolerates a failing source without dropping the others', async () => {
    const service = buildService({
      githubService: {
        getIntegration: () => Promise.reject(new Error('GitHub fora do ar')),
      },
    });

    const feed = await service.getFeed();

    expect(feed.some((item) => item.source === 'github')).toBe(false);
    expect(feed.some((item) => item.source === 'projects')).toBe(true);
    expect(feed.some((item) => item.source === 'posts')).toBe(true);
  });

  it('never calls the official LinkedIn provider when no official credentials are configured', async () => {
    const getPosts = jest.fn().mockRejectedValue(new Error('não deveria ser chamado'));
    const service = buildService({ linkedinProvider: { getPosts }, env: {} });

    const feed = await service.getFeed();

    expect(getPosts).not.toHaveBeenCalled();
    expect(feed.some((item) => item.source === 'linkedin')).toBe(false);
  });
});
