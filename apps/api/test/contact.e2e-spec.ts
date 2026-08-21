import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

// unified/remark/shiki (usados por PostsService) são ESM-only e quebram o
// Jest em modo CommonJS — mockado porque este suite não testa posts.
jest.mock('../src/modules/posts/markdown.js', () => ({
  markdownToHtml: jest.fn().mockResolvedValue('<p>mock</p>'),
}));

describe('Contact (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api', { exclude: ['health'] });
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const validPayload = {
    name: 'Visitante',
    email: 'visitante@example.com',
    subject: 'Assunto de teste',
    message: 'Mensagem de teste com conteúdo real.',
  };

  it('rejects an invalid payload with 400', () => {
    return request(app.getHttpServer())
      .post('/api/v1/contact')
      .send({ name: '', email: 'nao-e-email', subject: '', message: '' })
      .expect(400);
  });

  it('responds 503 when no mail provider is configured', () => {
    return request(app.getHttpServer())
      .post('/api/v1/contact')
      .send(validPayload)
      .expect(503)
      .expect((res) => {
        const body = res.body as { message: string };
        expect(body.message).toMatch(/temporariamente indisponível/i);
      });
  });

  it('discards a honeypot-filled submission as a silent fake success', () => {
    return request(app.getHttpServer())
      .post('/api/v1/contact')
      .send({ ...validPayload, honeypot: 'i-am-a-bot' })
      .expect(201)
      .expect({ status: 'sent' });
  });

  it('rate-limits repeated submissions from the same client', async () => {
    for (let i = 0; i < 3; i += 1) {
      await request(app.getHttpServer()).post('/api/v1/contact').send(validPayload);
    }

    await request(app.getHttpServer()).post('/api/v1/contact').send(validPayload).expect(429);
  });
});
