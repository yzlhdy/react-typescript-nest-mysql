import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import * as express from 'express'
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/any-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.enableCors();
  app.use(logger);
  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllExceptionsFilter());
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter());

  // 配置 Swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest zero to one--')
    .setDescription('一只灵活的羊 -http://localhost:4000/api/')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  await app.listen(4000);
}
bootstrap();
