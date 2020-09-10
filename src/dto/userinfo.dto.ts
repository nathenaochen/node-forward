import {IsString,MinLength,maxLength, isString, IsInt, IsOptional, IsNotEmpty} from 'class-validator';
import {ApiProperty,ApiPropertyOptional} from '@nestjs/swagger';

export class UserInfo {
  @ApiProperty({description: '用户名'})
  @IsNotEmpty()
  name: string;

  @ApiProperty({description: '密码'})
  @MinLength(6)
  @IsNotEmpty()
  password: string
  
}