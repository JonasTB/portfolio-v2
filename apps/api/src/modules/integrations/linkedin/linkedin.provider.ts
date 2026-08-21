import { Injectable, Logger } from '@nestjs/common';
import type { Experience, PostListItem, Profile } from '@portfolio/contracts';
import type { ProfessionalNetworkProvider } from './professional-network.provider.js';

/**
 * Provider oficial via LinkedIn Developer Platform — arquitetado, não implementado.
 *
 * Checado em ago/2026: a Profile API exige developer status aprovado + plano
 * pago Consumer Solutions Platform; o Marketing Developer Platform é restrito
 * a parceiros B2B com Company Page verificada (aprovação de semanas a meses).
 * Nenhum dos dois se aplica a uma aplicação pessoal. "Sign In with LinkedIn"
 * (grátis) só devolve login + nome/foto/headline, não experiência nem posts.
 * Reavaliar apenas se o acesso oficial mudar — nunca via scraping.
 */
@Injectable()
export class LinkedinProvider implements ProfessionalNetworkProvider {
  private readonly logger = new Logger(LinkedinProvider.name);

  getProfile(): Promise<Profile> {
    throw this.notImplemented();
  }

  getExperiences(): Promise<Experience[]> {
    throw this.notImplemented();
  }

  getPosts(): Promise<PostListItem[]> {
    throw this.notImplemented();
  }

  private notImplemented(): Error {
    const message =
      'LinkedinProvider não está implementado: sem acesso oficial confirmado ao LinkedIn Developer Platform para esta aplicação.';
    this.logger.warn(message);
    return new Error(message);
  }
}
