import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ContactController } from './contact.controller.js';
import { ContactService } from './contact.service.js';
import { ResendMailProvider } from './mail/resend-mail.provider.js';
import { UnavailableMailProvider } from './mail/unavailable-mail.provider.js';
import { MAIL_PROVIDER } from './mail/mail-provider.js';

@Module({
  imports: [ThrottlerModule.forRoot([{ name: 'default', ttl: 60_000, limit: 20 }])],
  controllers: [ContactController],
  providers: [
    ContactService,
    ResendMailProvider,
    UnavailableMailProvider,
    {
      provide: MAIL_PROVIDER,
      useFactory: (
        config: ConfigService,
        resend: ResendMailProvider,
        unavailable: UnavailableMailProvider,
      ) => {
        const isResendConfigured =
          config.get<string>('MAIL_PROVIDER') === 'resend' &&
          Boolean(config.get<string>('RESEND_API_KEY'));
        // Sem configuração real, o provider "indisponível" é o único usado —
        // nunca finge enviar um email que não vai sair.
        return isResendConfigured ? resend : unavailable;
      },
      inject: [ConfigService, ResendMailProvider, UnavailableMailProvider],
    },
  ],
})
export class ContactModule {}
