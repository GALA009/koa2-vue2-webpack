import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const newsSchema = new Schema({
  url: {type: String}, // 网页地址
  title: {type: String}, // 标题
  summary: {type: String},
  source: {type: Number, default: 0}, // 数据来源，1: readhub，2:开源中国，3:头条，4:36氪
  status: {type: Number},
  createdTime: {type: Date, default: Date.now},
  modifyTime: {type: Date, default: Date.now}
}, {
  versionKey: false
});

module.exports = mongoose.model('news', newsSchema);
