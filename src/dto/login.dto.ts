import {IsString,MinLength,maxLength, isString, IsInt, IsOptional} from 'class-validator';
import {ApiProperty,ApiPropertyOptional} from '@nestjs/swagger';

export class LoginInfo {
  @ApiProperty({description: '用户名称 '})
  @MinLength(5,{message:'name is too short. Minimal length is $constraint1 characters, but actual is $value'})
  name: string;

  @ApiPropertyOptional({description: ''})
  @IsOptional()  
  @IsString()
  title : string

  
  // @IsInt()
  // //用于可选参数来避免class-validator的检查  当可选参数传了则进行class-validator检查， 如果没有传则不会进行class-validator检查  否则会一直进行class-validator检查，当没有传时进行检查就会报错
  // @IsOptional()   
  // pwd: number

}