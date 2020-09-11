import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import {APP_GUARD,APP_PIPE,APP_INTERCEPTOR, APP_FILTER} from '@nestjs/core';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import {LogMiddleware} from './middleware/log.middleware';
import {AuthguardGuard} from './authguard/authguard.guard';
import {ParesInitPipe} from './pipe/pares-init.pipe';
import {InterceptorTestInterceptor} from './interceptor/interceptor-test.interceptor';
import {HttpExceptionFilter} from './filter/http-exception.filter';
import { ConfService } from './conf/conf.service';
import { ConfModule } from './conf/conf.module';
import { ConfigNestModule } from './config-nest/config-nest.module';
import { LoginModule } from './modules/login/login.module';
import {WinstonModule,utilities} from 'nest-winston';
import { ApiModule } from './modules/api/api.module';
import os = require('os');
import winston = require('winston');
import winstonDailyRotateFile = require('winston-daily-rotate-file');
// console.log('mm==--',process.env.NODE_ENV, os.platform());

if(os.platform() == 'win32'){
  if(process.env.NODE_ENV == 'development'){
    process.env.LOG_PATH = './log'
  }
}

@Module({
  imports: [ConfModule.register(process.env.NODE_ENV == 'development' ? 'development.env' : 'testfangzhen.env'),
             LoginModule,WinstonModule.forRoot({
              format:winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
              ),
              level:'http',
              exitOnError:false,
              // levels:winston.config.syslog.levels,
              // silent:false,
              transports:[
                process.env.NODE_ENV == 'development' && new winston.transports.Console({
                  format:winston.format.combine(
                    winston.format.timestamp(),
                    utilities.format.nestLike()
                  ),
                }),
                new winston.transports.File({
                  filename:process.env.LOG_PATH + '/err.log',
                  // dirname:process.env.LOG_PATH,
                  level: 'error',
                  handleExceptions:true,
                  maxsize: 1024 * 1024 * 10 //最大10兆
                }),
                new winstonDailyRotateFile({
                  filename: process.env.LOG_PATH + '/all.log',
                  // dirname:process.env.LOG_PATH,
                  level:'info',
                  handleExceptions:true,
                  // maxSize: 1024 * 1024 * 10 //最大10兆
                  // maxsize:
                  // json:true
                })
              ]
            }), ApiModule],
  // imports: [NewsModule,TestModule, ConfigNestModule],
  controllers: [AppController],
  providers: [AppService,{provide:APP_GUARD,useClass:AuthguardGuard},{provide:APP_PIPE,useClass:ParesInitPipe},
              {provide:APP_INTERCEPTOR,useClass:InterceptorTestInterceptor},{provide:APP_FILTER,useClass:HttpExceptionFilter}],
})

export class AppModule implements NestModule{
  //绑定中间件
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LogMiddleware).forRoutes('')
  }
}

// export class AppModule {}
