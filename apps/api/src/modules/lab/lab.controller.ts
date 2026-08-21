import { Controller, Get } from '@nestjs/common';
import type { LabExperiment } from '@portfolio/contracts';
import { LabService } from './lab.service.js';

@Controller('lab')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @Get()
  getAll(): LabExperiment[] {
    return this.labService.getAll();
  }
}
