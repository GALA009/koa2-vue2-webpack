import News from '../models/news.js';

const index = async (ctx) => {
  ctx.body = {
    name: '我是首页'
  };
};

const userInfo = async (ctx) => {
  console.log(ctx.query);

  let news = await News.find().limit(30);

  ctx.body = {
    name: '我是信息页',
    data: news
  };
};

module.exports = {
  index,
  userInfo
};
