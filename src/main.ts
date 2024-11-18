import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { documentFactory } from './config/swagger.config';
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectPgSimple from 'connect-pg-simple';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('api', app, documentFactory(app));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  await app.listen(3000);
  console.log(`Listening to PORT 3000`);
}
bootstrap();
