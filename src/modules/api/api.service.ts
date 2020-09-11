import { Injectable,HttpService,Inject, Logger} from '@nestjs/common';
import {resData} from '../../dto/res.dto';
import {ConfService} from '../../conf/conf.service';
import {WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';

@Injectable()
export class ApiService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger, private readonly httpService: HttpService, private readonly configService: ConfService){}

  async getRequest(params,req):Promise<resData<object>>{
    let serviceIp = this.configService.getValue(`${params['snType']}ServiceIp`);
    let servicePort = this.configService.getValue(`${params['snType']}ServicePort`);
    let serviceUri = this.configService.getValue(params['serviceName']);
    let url:string = `http://${serviceIp}:${servicePort}${serviceUri}`;
    delete params['snType'];
    delete params['serviceName'];
    this.logger.log(JSON.stringify({
      sid:req.cookies['sid'],
      reqQuery:params,
      url:serviceUri
    }),'api Request')
    const res = (await this.httpService.get(url,{params:params}).toPromise()).data;
    this.logger.log(JSON.stringify({
      sid:req.cookies['sid'],
      url:serviceUri,
      data:res
    }),'api Response')
    return resData.success(res);
  }

  async PostRequest(params,req):Promise<resData<object>>{
    let serviceIp = this.configService.getValue(`${params['snType']}ServiceIp`);
    let servicePort = this.configService.getValue(`${params['snType']}ServicePort`);
    let serviceUri = this.configService.getValue(params['serviceName']);
    let url:string = `http://${serviceIp}:${servicePort}${serviceUri}`;
    delete params['snType'];
    delete params['serviceName'];
    this.logger.log(JSON.stringify({
      sid:req.cookies['sid'],
      reqBody:params,
      url:serviceUri
    }),'api Request')
    const res = (await this.httpService.post(url,params).toPromise()).data;
    this.logger.log(JSON.stringify({
      sid:req.cookies['sid'],
      url:serviceUri,
      data:res
    }),'api Response')
    return resData.success(res);
  }
}
