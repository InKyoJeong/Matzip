import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3030;

  // if (process.env.NODE_ENV === 'production') {
  //   app.enableCors({
  //     origin: ['https://'],
  //     credentials: true,
  //   });
  // } else {
  app.enableCors({
    origin: true,
    credentials: true,
  });
  // }

  await app.listen(port);
  console.log(`http://localhost:${port}`);
}
bootstrap();
