const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const staticCache = require('koa-static-cache')

//路由
const index = require('./routes/index')
// 基础
const base = require('./routes/base')
// 权限管理
const limit = require('./routes/limit')
// 会员管理
const member = require('./routes/member')
// 会员管理
const need = require('./routes/need')


// import config from './public/javascripts/min/common/config'
// import request from './public/javascripts/min/common/request'

global.HOST = '';
// global.request = request;

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))
app.use(staticCache(__dirname + '/public'), {
  maxAge: 2 * 60 * 60
})

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

//页面美化
// app.locals.pretty = true;

// logger
app.use(async (ctx, next) => {
  const start = new Date();

  //首次进入获取访问地址用于区分环境，调用不同地址
  if(global.HOST === '') {
    console.log('112233445566')
    global.HOST = 'http://' + ctx.request.host;

    //开发地址
    if(ctx.request.host === 'admindev.gz.hui-jia.com.cn') {
      global.JAVAAPI = 'http://tpjgdev.gz.hui-jia.com.cn';
      global.IMAGEURL = 'http://imgdev.gz.hui-jia.com.cn/tpjg/img/';
    }
    //测试地址
    else if(ctx.request.host === 'admintest.gz.hui-jia.com.cn') {
      global.JAVAAPI = 'http://tpjgtest.gz.hui-jia.com.cn';
      global.IMAGEURL = 'http://imgtest.gz.hui-jia.com.cn/tpjg/img/';
    }//其它
    else {
      global.JAVAAPI = 'http://tpjgdev.gz.hui-jia.com.cn';
      global.IMAGEURL = 'http://imgdev.gz.hui-jia.com.cn/tpjg/img/';

    }
  }

  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(base.routes(), base.allowedMethods())
app.use(limit.routes(), limit.allowedMethods())
app.use(member.routes(), member.allowedMethods())
app.use(need.routes(), need.allowedMethods())

module.exports = app
