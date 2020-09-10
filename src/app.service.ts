import { Injectable } from '@nestjs/common';
import {ConfService} from './conf/conf.service';
// console.log('app--==');

@Injectable()
export class AppService {
  // constructor(private readonly confService: ConfService){}
  getHello(): string {
    return 'name';
  }
}
