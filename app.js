const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const staticCache = require('koa-static-cache')
const cors = require('koa-cors')

//路由
const index = require('./server/routes/index')

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(cors({
  origin: (ctx) => {
    return 'http://localhost:8080';
  },
  methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  credentials: true,
  maxAge: 2592000
}))
app.use(require('koa-static')(__dirname + '/public'))


// logger
app.use(async (ctx, next) => {
  try {
    await next()
    const start = new Date()
    const ms = new Date() - start
    
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)

  } catch (error) {
    ctx.status = error.status || 500;
    console.log(error)
  }
})

// routes
app.use(index.routes(), index.allowedMethods())

module.exports = app
