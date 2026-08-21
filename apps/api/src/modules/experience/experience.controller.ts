import { Controller, Get } from '@nestjs/common';
import type { Experience } from '@portfolio/contracts';
import { ExperienceService } from './experience.service.js';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  getAll(): Experience[] {
    return this.experienceService.getAll();
  }
}
