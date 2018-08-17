const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const staticCache = require('koa-static-cache');
const cors = require('koa-cors');
import mongoose from 'mongoose';

const app = new Koa();
//路由
const index = require('./server/routes/index');

// error handler
onerror(app);

// 连接数据库
mongoose.connect('mongodb://localhost:27017/ocean');
mongoose.connection.on('error', console.error);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(cors({
  origin: (ctx) => {
    return 'http://localhost:8081';
  },
  methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  credentials: true,
  maxAge: 2592000
}));
app.use(require('koa-static')(__dirname + '/public'));


// logger
app.use(async (ctx, next) => {
  try {
    await next();
    const start = new Date();
    const ms = new Date() - start;
    
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);

  } catch (error) {
    ctx.status = error.status || 500;
    console.log(error);
  }
})

// routes
app.use(index.routes(), index.allowedMethods());

module.exports = app
