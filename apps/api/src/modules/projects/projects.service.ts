import { Injectable, NotFoundException } from '@nestjs/common';
import type { Project } from '@portfolio/contracts';
import { projects } from '../../content/projects.js';

@Injectable()
export class ProjectsService {
  getAll(): Project[] {
    return projects;
  }

  getBySlug(slug: string): Project {
    const project = projects.find((item) => item.slug === slug);
    if (!project) {
      throw new NotFoundException(`Project "${slug}" not found`);
    }
    return project;
  }
}
