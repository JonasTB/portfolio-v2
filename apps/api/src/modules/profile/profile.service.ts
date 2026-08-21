import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Profile } from '@portfolio/contracts';
import { profile } from '../../content/profile.js';

@Injectable()
export class ProfileService {
  constructor(private readonly config: ConfigService) {}

  getProfile(): Profile {
    const email = this.config.get<string>('CONTACT_EMAIL');
    const whatsappNumber = this.config.get<string>('WHATSAPP_NUMBER');
    const whatsappMessage = this.config.get<string>('WHATSAPP_DEFAULT_MESSAGE') ?? '';

    return {
      ...profile,
      social: {
        ...profile.social,
        ...(email ? { email } : {}),
        ...(whatsappNumber
          ? {
              whatsapp: {
                number: whatsappNumber,
                defaultMessage: { 'pt-BR': whatsappMessage, 'en-US': whatsappMessage },
              },
            }
          : {}),
      },
    };
  }
}
