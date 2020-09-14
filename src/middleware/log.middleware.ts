import { Injectable, NestMiddleware } from '@nestjs/common';
import {ConfService} from '../conf/conf.service';
import {resData} from '../dto/res.dto';

//类中间件 -- 只能在module中通过consumer.apply()的方式实现
@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfService){}
  async use(req: Request |any, res: any, next: () => void) {
    try{
      // console.log('middleware',req.url,req.body,req.query,req.method);
      //如果是接口转发时，判断是否又传type和serviceName两个必传参数
      if(req.url.split('?')[0] == '/api'){
        let params = req.method == 'POST' ? req.body : req.query;
        if(!params.snType || !params.serviceName){
          throw new Error('snType or serviceName is required');
        }
        let serviceIp = this.configService.getValue(`${params['snType']}ServiceIp`);
        let servicePort = this.configService.getValue(`${params['snType']}ServicePort`);
        let serviceUri = this.configService.getValue(params['serviceName']);
        //检查是否能找到对应的转达ip，端口或者uri
        if(!serviceIp || !servicePort || !serviceUri){
          throw new Error('cant find serviceIp,servicePort,serviceUri, please checkout your params or config file');
        }
      }
      next();
    }catch(err){
      res.send(resData.fail({},err.message))
    }
  }
}
