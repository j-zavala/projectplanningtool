import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config as dotenvConfig } from 'dotenv';

// Load environment variables early
dotenvConfig({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3005);
}
bootstrap();
