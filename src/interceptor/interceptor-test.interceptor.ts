import { CallHandler, ExecutionContext, Injectable, NestInterceptor,Inject, Logger } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import {map,timeout} from 'rxjs/operators';
import {resData} from '../dto/res.fto';
import {WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';

/**
 * 拦截器 位于中间件-守卫之后，管道之前  nest中请求的生命周期 中间件-守卫-拦截器（控制器之前）-管道-控制器-服务-拦截器（控制器之后）
 * 中间件：一般在中间件中修改res，req等参数
 * 守卫：一般用来需要权限的接口做鉴权。 其返回值只能是true/false 以此来决定放行或是阻断当前请求。一般在守卫里面不可以修改res，req对象。（可以访问）
 * 拦截器：一般在拦截器中可以做：在处理函数执行之前/之后绑定额外的逻辑 修改处理函数返回的结果 判断是否需要返回缓存
 * 管道：一般用来做入参的校验
 */
@Injectable()
export class InterceptorTestInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger){

  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    const req = context.switchToHttp().getRequest();
    console.log('interceptor--gloab');
    // const isCached = true;
    // if (isCached) {
    //   return of([]);
    // }
    this.logger.log({
      sid:req.cookies['sid'],
      reqBody:req.body,
      reqQuery:req.query,
      url:req.url
    },'curl Request')
    return next.handle().pipe(map((data)=>{
      console.log('interceptor--gloab--after');
      this.logger.log({
        sid:req.cookies['sid'],
        url:req.url,
        response: data
      },'curl Response')
      return resData.success(data || {});}));
    // return next.handle().pipe(timeout(400))
  }
}
