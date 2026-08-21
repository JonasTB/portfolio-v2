import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProfileModule } from '../../profile/profile.module.js';
import { ExperienceModule } from '../../experience/experience.module.js';
import { PostsModule } from '../../posts/posts.module.js';
import { LocalProfessionalProfileProvider } from './local-professional-profile.provider.js';
import { LinkedinProvider } from './linkedin.provider.js';
import { PROFESSIONAL_NETWORK_PROVIDER } from './professional-network.provider.js';

@Module({
  imports: [ProfileModule, ExperienceModule, PostsModule],
  providers: [
    LocalProfessionalProfileProvider,
    LinkedinProvider,
    {
      provide: PROFESSIONAL_NETWORK_PROVIDER,
      useFactory: (
        config: ConfigService,
        local: LocalProfessionalProfileProvider,
        official: LinkedinProvider,
      ) => {
        const hasOfficialAccess =
          Boolean(config.get<string>('LINKEDIN_CLIENT_ID')) &&
          Boolean(config.get<string>('LINKEDIN_CLIENT_SECRET'));
        // Ausência das envs = provider local é o único usado; o oficial nunca é acionado.
        return hasOfficialAccess ? official : local;
      },
      inject: [ConfigService, LocalProfessionalProfileProvider, LinkedinProvider],
    },
  ],
  exports: [PROFESSIONAL_NETWORK_PROVIDER, LinkedinProvider],
})
export class LinkedinModule {}
