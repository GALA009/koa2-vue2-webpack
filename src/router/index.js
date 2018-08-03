import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import UserInfo from '@/components/UserInfo';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HelloWorld,
      name: 'index',
      meta: {
        title: '主页',
        btnPermissions: ['admin', 'supper']
      } // 按钮级别控制
    },
    {
      path: '/user',
      component: UserInfo,
      name: 'user',
      meta: {
        title: '用户信息',
        btnPermissions: ['admin', 'supper']
      } // 按钮级别控制
    }
  ]
});
