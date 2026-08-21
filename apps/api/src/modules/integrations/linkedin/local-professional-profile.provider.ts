import { Injectable } from '@nestjs/common';
import type { Experience, PostListItem, Profile } from '@portfolio/contracts';
import { ProfileService } from '../../profile/profile.service.js';
import { ExperienceService } from '../../experience/experience.service.js';
import { PostsService } from '../../posts/posts.service.js';
import type { ProfessionalNetworkProvider } from './professional-network.provider.js';

/**
 * Fonte de verdade real dos dados profissionais, não um fallback teórico.
 * Reaproveita os services de domínio já existentes — nenhum dado duplicado.
 */
@Injectable()
export class LocalProfessionalProfileProvider implements ProfessionalNetworkProvider {
  constructor(
    private readonly profileService: ProfileService,
    private readonly experienceService: ExperienceService,
    private readonly postsService: PostsService,
  ) {}

  getProfile(): Promise<Profile> {
    return Promise.resolve(this.profileService.getProfile());
  }

  getExperiences(): Promise<Experience[]> {
    return Promise.resolve(this.experienceService.getAll());
  }

  getPosts(): Promise<PostListItem[]> {
    return Promise.resolve(this.postsService.getAll());
  }
}
