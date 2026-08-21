import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import type { ContactRequest } from '@portfolio/contracts';
import { escapeHtml } from '../../../common/escape-html.js';
import type { MailProvider } from './mail-provider.js';

@Injectable()
export class ResendMailProvider implements MailProvider {
  constructor(private readonly config: ConfigService) {}

  async send(payload: ContactRequest): Promise<void> {
    const apiKey = this.config.get<string>('RESEND_API_KEY');
    const toEmail = this.config.get<string>('CONTACT_EMAIL');
    if (!apiKey || !toEmail) {
      throw new Error('RESEND_API_KEY ou CONTACT_EMAIL não configurado.');
    }

    // Cliente construído aqui, não no construtor: este provider pode ser
    // instanciado pelo Nest mesmo quando não é o ativo (ver contact.module.ts),
    // e o SDK do Resend lança na própria construção se a key estiver vazia.
    const client = new Resend(apiKey);
    const { error } = await client.emails.send({
      from: 'Portfólio <onboarding@resend.dev>',
      to: toEmail,
      replyTo: payload.email,
      subject: `[Portfólio] ${payload.subject}`,
      html: `
        <p><strong>De:</strong> ${escapeHtml(payload.name)} (${escapeHtml(payload.email)})</p>
        <p><strong>Assunto:</strong> ${escapeHtml(payload.subject)}</p>
        <p>${escapeHtml(payload.message).replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      throw new Error(`Resend respondeu com erro: ${error.message}`);
    }
  }
}
