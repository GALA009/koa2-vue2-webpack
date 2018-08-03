// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import iView from 'iview';
import has from './btnPermissions.js';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(iView);

// 根据路由title修改当前页的title
router.beforeEach((to, form, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
