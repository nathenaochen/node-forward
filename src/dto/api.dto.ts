import {ApiProperty} from '@nestjs/swagger';

export class ApiParams {
  @ApiProperty({description: '请求服务类型 '})
  type: string;

  @ApiProperty({description: '请求服务uri'})
  serviceName : string
}