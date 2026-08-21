import { Injectable } from '@nestjs/common';
import type { Experience } from '@portfolio/contracts';
import { experiences } from '../../content/experience.js';

@Injectable()
export class ExperienceService {
  getAll(): Experience[] {
    return experiences;
  }
}
