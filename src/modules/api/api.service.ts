import { Injectable,HttpService } from '@nestjs/common';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService){}

  async getRequest(){
    const res = await (await this.httpService.get('http://39.99.174.23:3000/').toPromise()).data;
    console.log(res);
    return res;
  }
}
