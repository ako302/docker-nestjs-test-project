import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  console.log(`bootstrap NODE_ENV: ${process.env.NODE_ENV}`);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  await app.listen(process.env.SERVER_PORT);
  logger.log(`server is running on ${process.env.SERVER_PORT}`);
}
bootstrap();
