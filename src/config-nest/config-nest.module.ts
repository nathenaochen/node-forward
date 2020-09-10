import { Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {parse} from 'dotenv';
import Apollo = require('node-apollo-client/dist');



/**
 * 使用nest自带的ConfigService模块定义配置模块
 */

 let filename = process.env.NODE_ENV == 'development' ? 'development.env' : 'testfangzhen.env';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true,
      load: [async () => await configInit(filename)]
    })
  ],
  providers:[]
})
export class ConfigNestModule {}

async function configInit(filename:string){

  const conf = parse(readFileSync(filename))
  console.log(conf);
  const apollo = new Apollo({
      configServerUrl:conf['apolloconfigServerUrl'],
      appId:conf['appId'],
      namespaces:['common'],
      initialConfigs:{
        application:{
          init:1
        },
      },
      listenOnNotification:false,
      fetchCacheInterval: 24 * 60 * 60e3,
      cachedConfigFilePath: resolve('./')
    })
    // console.log(apollo,11);
  // apollo.refreshConfigs({configs:{},namespace:''});
  // const id = await apollo.fetchConfigs({keys:['appId']})
  // console.log(id);
  const data = readFileSync('web-core-nodeApolloCachedConfig.json');
  // console.log(JSON.parse(data.toString()));

  return JSON.parse(data.toString());
}