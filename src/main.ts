import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  console.log(`bootstrap NODE_ENV: ${process.env.NODE_ENV}`);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  /*  await app.listen(process.env.SERVER_PORT);
  logger.log(`server is running on ${process.env.SERVER_PORT}`);
*/
  // If not use docker:

  const serverConfig = config.get('server');
  const port = serverConfig.port;
  logger.log(`port: ${port}`);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
