import { InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import { ContactService } from './contact.service.js';
import { MailProviderUnavailableError } from './mail/mail-provider.js';
import type { ContactRequest } from '@portfolio/contracts';

const basePayload: ContactRequest = {
  name: 'Visitante',
  email: 'visitante@example.com',
  subject: 'Assunto',
  message: 'Mensagem de teste',
};

describe('ContactService', () => {
  it('sends the message through the mail provider and reports success', async () => {
    const send = jest.fn().mockResolvedValue(undefined);
    const service = new ContactService({ send });

    const result = await service.submit(basePayload, '127.0.0.1');

    expect(result).toEqual({ status: 'sent' });
    expect(send).toHaveBeenCalledWith(basePayload);
  });

  it('discards spam silently when the honeypot field is filled, never calling the provider', async () => {
    const send = jest.fn().mockResolvedValue(undefined);
    const service = new ContactService({ send });

    const result = await service.submit({ ...basePayload, honeypot: 'i-am-a-bot' }, '127.0.0.1');

    expect(result).toEqual({ status: 'sent' });
    expect(send).not.toHaveBeenCalled();
  });

  it('maps MailProviderUnavailableError to a 503', async () => {
    const send = jest.fn().mockRejectedValue(new MailProviderUnavailableError('sem provider'));
    const service = new ContactService({ send });

    await expect(service.submit(basePayload, '127.0.0.1')).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });

  it('maps unexpected provider errors to a 500', async () => {
    const send = jest.fn().mockRejectedValue(new Error('falha inesperada'));
    const service = new ContactService({ send });

    await expect(service.submit(basePayload, '127.0.0.1')).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });
});
