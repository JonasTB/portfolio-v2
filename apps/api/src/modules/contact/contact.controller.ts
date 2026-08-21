import { Body, Controller, Ip, Post, UseGuards, UsePipes } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { contactRequestSchema, type ContactRequest } from '@portfolio/contracts';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe.js';
import { ContactService } from './contact.service.js';

@Controller('contact')
@UseGuards(ThrottlerGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @Throttle({ default: { limit: 3, ttl: 600_000 } })
  @UsePipes(new ZodValidationPipe(contactRequestSchema))
  submit(@Body() body: ContactRequest, @Ip() ip: string): Promise<{ status: 'sent' }> {
    return this.contactService.submit(body, ip);
  }
}
