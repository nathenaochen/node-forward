import { Injectable, NestMiddleware } from '@nestjs/common';

//类中间件 -- 只能在module中通过consumer.apply()的方式实现
@Injectable()
export class LogMiddleware implements NestMiddleware {
  async use(req: Request |any, res: any, next: () => void) {
    console.log('middleware');
    res.setHeader('Access-Control-Allow-Credentials',true);
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8081');
    req.session.name = 'chenao';
    // if(!req.session.info){
    //   req.session.info = {}
    // }
    // if(!req.cookies.name){
    //   console.log('set cookies');
    //   res.cookie('name','zhangsan',{maxAge: 900000, httpOnly: false});
    // }
    // console.log(req.cookies.name,'cookies');
    // res.send('middle')
    // res.on('finish',()=>{
    //   console.log('finish')
    // })
    // res._end = res.end;
    // res.end=function(){
    //   res._end.apply(res,arguments)
    //   console.log('end')
    // }
    next();
  }
}
