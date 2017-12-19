/*
 * @Author: Zhang Genmao 
 * @Date: 2017-07-20 14:16:06 
 * @Last Modified by: Zhang Genmao
 */

const list = require('../controllers/list')

const router = require('koa-router')()

// 后台主页
router.get('/', list.userInfo)

router.get('/api', list.userInfo)

module.exports = router
