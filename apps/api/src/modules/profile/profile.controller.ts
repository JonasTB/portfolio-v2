import { Controller, Get } from '@nestjs/common';
import type { Profile } from '@portfolio/contracts';
import { ProfileService } from './profile.service.js';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  get(): Profile {
    return this.profileService.getProfile();
  }
}
