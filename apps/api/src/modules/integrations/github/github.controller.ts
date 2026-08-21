import { Controller, Get } from '@nestjs/common';
import type { GithubIntegration } from '@portfolio/contracts';
import { GithubService } from './github.service.js';

@Controller('integrations/github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  get(): Promise<GithubIntegration> {
    return this.githubService.getIntegration();
  }
}
