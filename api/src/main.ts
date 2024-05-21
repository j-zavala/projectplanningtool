import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';

// load environment variables manually
// dotenv.config({ path: '.env' });

console.log('main.ts ========================');
console.log('host:', process.env.DATABASE_HOST);
console.log('port:', process.env.DATABASE_PORT);
console.log('username:', process.env.DATABASE_USERNAME);
console.log('password:', process.env.DATABASE_PASSWORD);
console.log('name:', process.env.DATABASE_NAME);
console.log('main.ts ========================');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
