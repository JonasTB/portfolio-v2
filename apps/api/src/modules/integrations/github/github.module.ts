import { Module } from '@nestjs/common';
import { GithubController } from './github.controller.js';
import { GithubService } from './github.service.js';
import { GithubApiProvider } from './github-api.provider.js';
import { GITHUB_PROVIDER } from './github.provider.js';

@Module({
  controllers: [GithubController],
  providers: [GithubService, { provide: GITHUB_PROVIDER, useClass: GithubApiProvider }],
  exports: [GithubService],
})
export class GithubModule {}
