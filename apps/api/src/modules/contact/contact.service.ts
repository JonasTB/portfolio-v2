import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import type { ContactRequest } from '@portfolio/contracts';
import {
  MAIL_PROVIDER,
  MailProviderUnavailableError,
  type MailProvider,
} from './mail/mail-provider.js';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(@Inject(MAIL_PROVIDER) private readonly mailProvider: MailProvider) {}

  async submit(payload: ContactRequest, ip: string): Promise<{ status: 'sent' }> {
    // Honeypot: bots preenchem este campo, humanos nunca veem. Resposta
    // idêntica ao sucesso real — nunca revela que a mensagem foi descartada.
    if (payload.honeypot) {
      this.logger.warn(`Honeypot preenchido, descartando silenciosamente (ip=${ip}).`);
      return { status: 'sent' };
    }

    try {
      await this.mailProvider.send(payload);
      this.logger.log(`Mensagem de contato enviada com sucesso (ip=${ip}).`);
      return { status: 'sent' };
    } catch (error) {
      if (error instanceof MailProviderUnavailableError) {
        this.logger.warn(`Envio de contato indisponível (ip=${ip}): provider não configurado.`);
        throw new ServiceUnavailableException(
          'O envio direto está temporariamente indisponível. Use o email ou WhatsApp listados nesta página.',
        );
      }
      this.logger.error(`Falha ao enviar mensagem de contato (ip=${ip}).`);
      throw new InternalServerErrorException(
        'Não foi possível enviar sua mensagem agora. Tente novamente em instantes.',
      );
    }
  }
}
