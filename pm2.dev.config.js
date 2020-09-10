module.exports = {
  apps : [{
    name: "node-forward",        //应用名称
    script: "./dist/main.js",   //pm2启动脚本
    exec_mode:"cluster",        //设置应用的部署模式 fork-多进程单列模式 cluster集群模式
    instances:0,                //实例个数
    watch:'false',              //监听文件变化 自动重启
    max_memory_restart:"300M",  //应用所占用最大内存 超出该内存则自动重启应用
    env: {                      //环境变量配置
      NODE_ENV: "development",
      LOG_PATH: "./log"
    },
    min_uptime: "60s" ,         //应用最少正常运行60s 才能被视为正常启动
    autorestart: true,          //当应用崩溃时 自动重启应用
    max_restarts: 10,           //在你的应用程序被认为是错误的并且停止重新启动之前，连续不稳定重启的崩溃次数
    error_file: "./log/web-service-err.log",        //错误日志路径
    out_file: "./log/web-service-out.log",          //普通日志路径
    pid_file: "./log/web-service-pid.log",           //进程相关日志路径
    log_date_format: "YYYY-MM-DD"
  }]
}