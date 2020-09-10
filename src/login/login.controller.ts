import { Controller, Get, Query, Request, Response, UseInterceptors } from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {LoginService} from './login.service';
import {UserInfo} from '../dto/userinfo.dto';

@Controller('login')
@ApiTags('login')
export class LoginController {
  constructor(private readonly loginService: LoginService){}
  @Get('userlogin')
  userlogin(@Request() req, @Query() userInfo:UserInfo){
    const a = this.loginService.userlogin(req,userInfo);
    return a;
  }
  @Get('idlogin')
  idLogin(@Request() req,@Query() idinfo){
    
    // this.loginService.idlogin(req,idinfo);
    return 'idlogin';
  }
}
