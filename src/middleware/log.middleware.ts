import { Injectable, NestMiddleware } from '@nestjs/common';

//类中间件 -- 只能在module中通过consumer.apply()的方式实现
@Injectable()
export class LogMiddleware implements NestMiddleware {
  async use(req: Request |any, res: any, next: () => void) {
    // console.log('middleware',req.session);
    next();
  }
}
