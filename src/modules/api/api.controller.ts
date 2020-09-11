import { Controller, Get, Post, Query, Body, Req } from '@nestjs/common';
import {resData} from '../../dto/res.dto';
import {ApiParams} from '../../dto/api.dto';
import {ApiService} from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiSetvice: ApiService){}
  @Get()
  async getRoute(@Query() query: ApiParams, @Req() req): Promise<resData<object>>{
    return await this.apiSetvice.getRequest(query,req);
  }

  @Post()
  async postRoute(@Body() body: ApiParams,@Req() req){
    return await this.apiSetvice.PostRequest(body,req);
  }
}
