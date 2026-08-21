import { Controller, Get } from '@nestjs/common';
import type { Activity } from '@portfolio/contracts';
import { ActivityService } from './activity.service.js';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  getFeed(): Promise<Activity[]> {
    return this.activityService.getFeed();
  }
}
