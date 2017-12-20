const index = async (ctx) => {
  console.log(ctx);
  ctx.body = {
    name: '我是首页'
  }
}

const userInfo = async (ctx) => {
  console.log(ctx);
  ctx.body = {
    name: '我是信息页'
  }
}

module.exports = {
  index,
  userInfo
}