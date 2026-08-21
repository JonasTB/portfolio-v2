import type { ContactRequest } from '@portfolio/contracts';

export const MAIL_PROVIDER = Symbol('MAIL_PROVIDER');

export interface MailProvider {
  send(payload: ContactRequest): Promise<void>;
}

export class MailProviderUnavailableError extends Error {}
