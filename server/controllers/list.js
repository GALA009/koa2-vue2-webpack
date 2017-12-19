const userInfo = async (ctx) => {
  console.log(ctx);
  ctx.body = {
    name: '好伤感',
    year: '23'
  }
}

module.exports = {
  userInfo
}