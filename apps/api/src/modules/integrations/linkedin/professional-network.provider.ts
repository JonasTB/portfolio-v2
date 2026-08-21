import type { Experience, PostListItem, Profile } from '@portfolio/contracts';

export const PROFESSIONAL_NETWORK_PROVIDER = Symbol('PROFESSIONAL_NETWORK_PROVIDER');

export interface ProfessionalNetworkProvider {
  getProfile(): Promise<Profile>;
  getExperiences(): Promise<Experience[]>;
  getPosts(): Promise<PostListItem[]>;
}
