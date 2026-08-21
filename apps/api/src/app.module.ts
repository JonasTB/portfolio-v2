import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './modules/health/health.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { PostsModule } from './modules/posts/posts.module';
import { LabModule } from './modules/lab/lab.module';
import { GithubModule } from './modules/integrations/github/github.module';
import { LinkedinModule } from './modules/integrations/linkedin/linkedin.module';
import { ActivityModule } from './modules/activity/activity.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    HealthModule,
    ProfileModule,
    ExperienceModule,
    ProjectsModule,
    PostsModule,
    LabModule,
    GithubModule,
    LinkedinModule,
    ActivityModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
