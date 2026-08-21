import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Activity } from '@portfolio/contracts';
import { PostsService } from '../posts/posts.service.js';
import { ProjectsService } from '../projects/projects.service.js';
import { LabService } from '../lab/lab.service.js';
import { GithubService } from '../integrations/github/github.service.js';
import { LinkedinProvider } from '../integrations/linkedin/linkedin.provider.js';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);

  constructor(
    private readonly postsService: PostsService,
    private readonly projectsService: ProjectsService,
    private readonly labService: LabService,
    private readonly githubService: GithubService,
    private readonly linkedinProvider: LinkedinProvider,
    private readonly config: ConfigService,
  ) {}

  async getFeed(): Promise<Activity[]> {
    const results = await Promise.all([
      this.collect('posts', () => this.fromPosts()),
      this.collect('projects', () => this.fromProjects()),
      this.collect('lab', () => this.fromLab()),
      this.collect('github', () => this.fromGithub()),
      this.collect('linkedin', () => this.fromLinkedin()),
    ]);

    return results.flat().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  private async collect(source: string, load: () => Promise<Activity[]>): Promise<Activity[]> {
    try {
      return await load();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Falha ao agregar atividade de "${source}", ignorando fonte: ${message}`);
      return [];
    }
  }

  private fromPosts(): Promise<Activity[]> {
    const activities = this.postsService.getAll().map((post): Activity => ({
      id: `posts-${post.slug}`,
      type: 'post_published',
      source: 'posts',
      title: {
        'pt-BR': `Novo post: ${post.title}`,
        'en-US': `New post: ${post.title}`,
      },
      url: `/posts/${post.slug}`,
      createdAt: post.date,
    }));
    return Promise.resolve(activities);
  }

  private fromProjects(): Promise<Activity[]> {
    const activities = this.projectsService.getAll().flatMap((project): Activity[] => {
      if (!project.publishedAt) return [];
      return [
        {
          id: `projects-${project.slug}`,
          type: 'project_updated',
          source: 'projects',
          title: {
            'pt-BR': `Projeto atualizado: ${project.title}`,
            'en-US': `Project updated: ${project.title}`,
          },
          url: `/projects/${project.slug}`,
          createdAt: project.publishedAt,
        },
      ];
    });
    return Promise.resolve(activities);
  }

  private fromLab(): Promise<Activity[]> {
    const activities = this.labService.getAll().map((experiment): Activity => ({
      id: `lab-${experiment.slug}`,
      type: 'lab_updated',
      source: 'lab',
      title: {
        'pt-BR': `Lab atualizado: ${experiment.title}`,
        'en-US': `Lab updated: ${experiment.title}`,
      },
      url: '/lab',
      createdAt: experiment.updatedAt,
    }));
    return Promise.resolve(activities);
  }

  private async fromGithub(): Promise<Activity[]> {
    const { repositories } = await this.githubService.getIntegration();
    return repositories.flatMap((repository): Activity[] => {
      if (!repository.updatedAt) return [];
      return [
        {
          id: `github-${repository.name}`,
          type: 'repo_updated',
          source: 'github',
          title: {
            'pt-BR': `Repositório atualizado: ${repository.name}`,
            'en-US': `Repository updated: ${repository.name}`,
          },
          url: repository.url,
          createdAt: repository.updatedAt,
        },
      ];
    });
  }

  private async fromLinkedin(): Promise<Activity[]> {
    const hasOfficialAccess =
      Boolean(this.config.get<string>('LINKEDIN_CLIENT_ID')) &&
      Boolean(this.config.get<string>('LINKEDIN_CLIENT_SECRET'));

    // Sem acesso oficial confirmado, esta fonte fica sempre vazia — ver linkedin.provider.ts.
    if (!hasOfficialAccess) {
      return [];
    }

    const posts = await this.linkedinProvider.getPosts();
    return posts.map((post): Activity => ({
      id: `linkedin-${post.slug}`,
      type: 'linkedin_post_published',
      source: 'linkedin',
      title: {
        'pt-BR': `Novo post no LinkedIn: ${post.title}`,
        'en-US': `New LinkedIn post: ${post.title}`,
      },
      createdAt: post.date,
    }));
  }
}
