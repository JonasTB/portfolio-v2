import { Controller, Get, Param } from '@nestjs/common';
import type { Project } from '@portfolio/contracts';
import { ProjectsService } from './projects.service.js';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAll(): Project[] {
    return this.projectsService.getAll();
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string): Project {
    return this.projectsService.getBySlug(slug);
  }
}
