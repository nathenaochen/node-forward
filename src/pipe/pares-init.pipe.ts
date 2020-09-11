import { ArgumentMetadata, Injectable, PipeTransform , BadRequestException, HttpException} from '@nestjs/common';
import {plainToClass,classToPlain} from 'class-transformer';
import {validate} from 'class-validator';
import {ConfService} from '../conf/conf.service';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class ParesInitPipe implements PipeTransform {
  constructor(private readonly ConfService:ConfService){
  }
  async transform(value: any, metadata: ArgumentMetadata) {
    // console.log('pipe',value,metadata);
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    let obj = plainToClass(metadata.metatype,value);
    let errors = await validate(obj,{ validationError:{target: false }});
    if(errors[0]){
      throw new BadRequestException(errors[0].constraints);
    }else{
      return value;
    }
  }
  private toValidate(type :Function) : Boolean{
    let arrName: Function[] = [Object, String ,Boolean, Number, Array];
    return !arrName.includes(type);
  }
}
