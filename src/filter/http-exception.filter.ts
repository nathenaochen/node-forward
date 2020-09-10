import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject, Logger } from '@nestjs/common';
import {Request, Response} from 'express';
import {resData} from '../dto/res.fto';
import {WINSTON_MODULE_PROVIDER} from 'nest-winston';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger){

  }
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if(exception instanceof HttpException){
      const status = exception.getStatus();
      console.log('fliter');
      this.logger.error(exception.getResponse(),'error trace','error message')
      response.status(status).send(resData.fail({},exception.getResponse()));
    }else{
      this.logger.error(exception.message,'error trace','error message');
      response.status(500).send(resData.fail({},exception.message));
    }
    

    // response.status(status).send(resData.success({}))
  }
}
