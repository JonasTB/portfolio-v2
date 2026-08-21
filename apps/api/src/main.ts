import { json } from 'express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Limite defensivo de payload — a validação real (Zod) já cobre os campos,
  // isto é só uma barreira barata na camada de transporte.
  app.use(json({ limit: '20kb' }));

  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.enableCors({ origin: config.get<string>('WEB_URL') ?? 'http://localhost:5173' });

  const port = config.get<string>('PORT') ?? 3000;
  await app.listen(port);
}
void bootstrap();
