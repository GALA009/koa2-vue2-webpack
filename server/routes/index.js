/*
 * @Author: Zhang Genmao
 * @Date: 2017-07-20 14:16:06
 * @Last Modified by: Zhang Genmao
 */

const list = require('../controllers/list');

const router = require('koa-router')();

// 后台主页
router.get('/', list.index);

router.get('/api/index', list.index);
router.get('/api/user', list.userInfo);
router.post('/api/login', list.login);

module.exports = router;
