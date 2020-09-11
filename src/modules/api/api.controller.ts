import { Controller, Get, Post } from '@nestjs/common';
import {ApiService} from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiSetvice: ApiService){}
  @Get()
  async getRoute(){
    return await this.apiSetvice.getRequest();
  }

  @Post()
  postRoute(){
    return 'post'
  }
}
