import { Module } from '@nestjs/common';
import { PostsModule } from '../posts/posts.module.js';
import { ProjectsModule } from '../projects/projects.module.js';
import { LabModule } from '../lab/lab.module.js';
import { GithubModule } from '../integrations/github/github.module.js';
import { LinkedinModule } from '../integrations/linkedin/linkedin.module.js';
import { ActivityController } from './activity.controller.js';
import { ActivityService } from './activity.service.js';

@Module({
  imports: [PostsModule, ProjectsModule, LabModule, GithubModule, LinkedinModule],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
