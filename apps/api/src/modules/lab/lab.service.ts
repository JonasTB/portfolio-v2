import { Injectable } from '@nestjs/common';
import type { LabExperiment } from '@portfolio/contracts';
import { labExperiments } from '../../content/lab.js';

@Injectable()
export class LabService {
  getAll(): LabExperiment[] {
    return labExperiments;
  }
}
