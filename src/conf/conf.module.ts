import { Module,DynamicModule,Global } from '@nestjs/common';
import {ConfService} from './conf.service';


/**
 * 自定义配置模块
 */
@Global()
@Module({})
export class ConfModule {
  static register(filename:string): DynamicModule{
    return {
      module: ConfModule,
      providers:[{provide:'OPTION',useValue:filename},ConfService],
      // providers:[{provide:ConfService,useValue:new ConfService(filename)}],
      exports:[ConfService]
    }
  }
}
