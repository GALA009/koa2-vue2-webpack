import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index';
import UserInfo from '@/components/UserInfo';
import Login from '@/components/login';
import Register from '@/components/register';
import Create from '@/components/create';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      meta: {
        title: '主页'
      } // 按钮级别控制
    },
    {
      path: '/user',
      component: UserInfo,
      name: 'user',
      meta: {
        title: '用户信息',
        role: ['admin', 'supper']
      } // 按钮级别控制
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
      meta: {
        title: '登陆',
        role: ['admin', 'supper']
      } // 按钮级别控制
    },
    {
      path: '/register',
      component: Register,
      name: 'register',
      meta: {
        title: '注册',
        role: ['admin', 'supper']
      } // 按钮级别控制
    },
    {
      path: '/create',
      component: Create,
      name: 'create',
      meta: {
        title: '注册',
        role: ['admin', 'supper']
      } // 按钮级别控制
    }
  ]
});
