import { Injectable } from '@nestjs/common';
import {UserInfo} from '../dto/userinfo.dto'

@Injectable()
export class LoginService {
  userlogin(req: any,userInfo:UserInfo){
    // console.log(req.cookies,'isis');
    // if(req.cookies.id){
    //   return {username:userInfo.name,msg:'you have login!!'}
    // }
    // res.cookie('id','12345556',{maxAge: 900000, httpOnly: false})
    return {username:userInfo.name,msg:'login success!!'}
  }
  idlogin(req,idinfo){
    console.log(req.session,'00001',req.cookies['web-core-sid']);
    // req.session.info.name = idinfo.name;

  }
}
