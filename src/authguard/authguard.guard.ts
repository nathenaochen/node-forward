import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from '@nestjs/core';

/**
 * 路由守卫，一般用来需要权限的接口做鉴权。 其返回值只能是true/false 以此来决定放行或是阻断当前请求。一般在守卫里面不可以修改res，req对象。
 */

@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor( private readonly relector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('guard');
    const req = context.switchToHttp().getRequest();
    let roles = this.relector.get('roles',context.getHandler());
    // console.log(roles,'roles');
    if(!roles){
      return true;
    }
    return req.headers.from == 'localhost';
  }
}
            