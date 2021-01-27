import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import config from './config';


/**
 * bootstrap
 */
async function bootstrap() {

  /** logger instance */
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule, { cors: true });

  /** validate all request dtos */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));;

  const options = new DocumentBuilder()
    .setTitle('Shop')
    .setDescription('API for Shop')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.http.port || 5000);

  logger.log(`app is listening on port ${config.http.port}`);
}
bootstrap();
