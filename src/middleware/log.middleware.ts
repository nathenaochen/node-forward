import { Injectable, NestMiddleware } from '@nestjs/common';

//类中间件 -- 只能在module中通过consumer.apply()的方式实现
@Injectable()
export class LogMiddleware implements NestMiddleware {
  async use(req: Request |any, res: any, next: () => void) {
    // console.log('middleware',req.url,req.body,req.query,req.method);
    //如果是接口转发时，判断是否又传type和serviceName两个必传参数
    console.log();
    if(req.url.split('?')[0] == '/api'){
      let params = req.method == 'POST' ? req.body : req.query;
      if(!params.snType || !params.serviceName){
        throw new Error('snType or serviiceName is required');
      }
    }
    next();
  }
}
