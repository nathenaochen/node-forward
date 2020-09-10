import { Injectable,Inject } from '@nestjs/common';
import {readFileSync, read} from 'fs';
import {resolve} from 'path';
import {parse} from 'dotenv';
// const fs = require('fs');

@Injectable()
export class ConfService {
  envConfig:object
  constructor(@Inject('OPTION') filename: string){
    // console.log(resolve(__dirname,'../' + filename));
    let envConfig = parse(readFileSync(filename));
    this.envConfig = envConfig;
    // console.log(envConfig);
  }

  // constructor(filename: string){
  //   // console.log(resolve(__dirname,'../' + filename));
  //   let envConfig = parse(readFileSync(filename));
  //   this.envConfig = envConfig;
  //   // console.log(envConfig);
  // }
  getValue(key:string):string{
    return this.envConfig[key];
  }
  getConfig():object{
    return this.envConfig
  }
}
