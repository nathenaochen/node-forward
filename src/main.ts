import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from './filter/http-exception.filter';
import {ParesInitPipe} from './pipe/pares-init.pipe';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import {ConfService} from './conf/conf.service';
import {ConfigService} from '@nestjs/config';
import {InterceptorTestInterceptor} from './interceptor/interceptor-test.interceptor';
import * as session from 'express-session';
import {initRedisConnect} from './libs/redis-connect';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:false,logger:true});

  app.setGlobalPrefix('forward');

  
  app.use(cookieParser());

  app.use(initRedisConnect())


  //生成api接口文档  swagger文档
  const option = new DocumentBuilder()
  .setTitle('Nest Js Program')
  .setDescription('This is My fisr NestJs Program')
  .addTag('Api')
  .setVersion('0.00.001')
  .build()
  const doc = SwaggerModule.createDocument(app,option);
  SwaggerModule.setup('api-node-forward',app,doc);
  await app.listen(3001);
}
bootstrap(); 
