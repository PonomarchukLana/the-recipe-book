import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
