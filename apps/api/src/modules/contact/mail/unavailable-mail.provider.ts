import { Injectable } from '@nestjs/common';
import type { ContactRequest } from '@portfolio/contracts';
import { MailProviderUnavailableError, type MailProvider } from './mail-provider.js';

/**
 * Provider ativo enquanto nenhum MAIL_PROVIDER real estiver configurado.
 * Nunca finge sucesso: o controller traduz este erro num 503 claro, e a
 * página de contato aponta para email/WhatsApp diretos como alternativa.
 */
@Injectable()
export class UnavailableMailProvider implements MailProvider {
  send(_payload: ContactRequest): Promise<void> {
    return Promise.reject(
      new MailProviderUnavailableError(
        'Nenhum provider de email configurado (defina MAIL_PROVIDER e RESEND_API_KEY).',
      ),
    );
  }
}
