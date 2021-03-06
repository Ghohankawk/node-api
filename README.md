# <font color=green>fanyi-api</font>
基于koa2搭建的翻译项目后端中台系统

# <font color=green>环境准备</font>
```
node > 8.x
```
# <font color=green>安装&启动</font>

## 步骤一 安装pm2
```
npm install pm2 -g
pm2 install pm2-logrotate
```
pm2 install pm2-logrotate(支持日志滚动生成的插件)  

## 步骤二 下载安装工程
``` 
git clone git@sogou-inc.com:ps-front/fanyi-api.git
cd fanyi-api
npm install
```
## 步骤三 配置数据库连接&web端口配置 支持多环境配置
* 项目中使用到的mysql数据库表：fanyi-api/config/bff_cachedata.sql
* 先创建数据库(默认bffdb)再运行该脚本创建表
* 配置项目中的数据库连接
* 路径：fanyi-api/config/default.js
* port web端口

## 步骤四 启动和停止项目 (根据环境要求运行不同的脚本)
```
npm run dev | test | production | release
npn run stopall
```
启动成功如下图
![](/source/images/koa1.png)
启动成功使用postman验证接口是否正确
![](/source/images/koa2.png)

# <font color=green>其他说明</font>
## 常用pm2命令
```
pm2 list             (列举出所有用pm2启动的程序)
pm2 restart          (重启)
pm2 stop id | name   (进程的id和名称)
pm2 describe id      (查看启动程序的详细信息)
pm2 monit            (可以得到进程(以及集群)的CPU的使用率和内存占用(ctrl +c 退出))
pm2 logs             (实时集中log处理)
pm2 web              (监控所有被PM2管理的进程,而且同时还想监控运行这些进程的机器的状态)
```
[查看更多关于pm2](http://pm2.keymetrics.io/)

## 查看日志 支持不同环境的日志配置
日志配置文件：ecosystem.config.js
```js
module.exports = {
  apps: [{
    name: 'fanyi-api-development',
    script: 'index.js',
    autorestart: true,
    output: './logs/out.log',
    error: './logs/error.log',
    log: './logs/combined.outerr.log',
    env: {
      NODE_ENV: 'development',
      port: 3000
    }
  }
  ......
  ......
  ]
}
```
使用pm2查看后台日志
```
$ pm2 logs
$ pm2 logs [app-name]
$ pm2 logs --json
```

## node定时任务插件-node-schedule

https://github.com/node-schedule/node-schedule

## WEB API
如果你不仅仅想监控被pm2管理的进程，还需要监控进程所运行的机器的信息，你可以使用下面这个API
```
$ pm2 web
```
pm2会启动一个叫做pm2-http-interface的进程提供web服务。你打开浏览器输入http：//127.0.0.1:9615

pm2提供的web api通过json输出了很多信息

## git常用操作
```
git pull origin develop   拉取远程分支develop到本地
git checkout develop      切换到develop分支
git branch                查看当前分支
git branch -r             查看远程分支

```
