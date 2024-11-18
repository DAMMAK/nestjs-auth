// swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const config = new DocumentBuilder()
  .setTitle('Authentication Doc')
  .setDescription('The authentication API description')
  .setVersion('1.0')
  .addTag('auth')
  .build();

export const documentFactory = (app: INestApplication) => {
  return SwaggerModule.createDocument(app, config);
};
