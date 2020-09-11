import redis from 'ioredis';
import { v4 as uuidv4 } from 'node-uuid';

export function initRedisConnect(){
  
  let redisClient;
  if(!redisClient){
    try{
      //默认链接127.0.0.1:6379 端口的redis服务
      redisClient = new redis();
    }catch(err){
      throw new Error(err);
    }
  }
  console.log('redis--1');

  //自定义express中间件，优先于nestjs中间件模块先执行
  return function(req,res,next){
    let sid;
    console.log('redis--2');
    //判断浏览器是否支持cookie
    if(!req.hasOwnProperty('cookies')){
      throw Error('your client dont supoort Cookies, please use app(cookieParser())');
    }
    if(!req.cookies.sid){
      sid = `sid${uuidv4().replace(/\-/g,'')}`;
      res.cookie('sid', sid ,{maxAge: 1000*60*30, httpOnly: true});
      req.cookies.sid = sid;
    }else{
      sid = req.cookies.sid;
    }
    redisClient.get(sid,function(err,str){
      if(err){
        throw new Error('链接redis出错')
      }
      if(!str){
        req.session = {}
      }else{
        req.session = JSON.parse(str)
      }

      next();
    })
    res.on('finish',()=>{
      if(!req.session) req.session = {};
      redisClient.set(sid,JSON.stringify(req.session),'ex',60*30)
    });
  }
}
