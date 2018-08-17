import Vue from 'vue';

/** 权限指令 **/
const has = Vue.directive('has', {
  bind: function (el, binding, vnode) {
    // 获取页面按钮权限
    let role = vnode.context.$route.meta.role;
    // 如果不存在权限则删除当前控件
    if (!Vue.prototype.$_has(role)) {
      el.parentNode.removeChild(el);
    }
  }
});

// 权限检查方法
Vue.prototype.$_has = function (value) {
  let isExist = false;
  // 获取用户按钮权限
  let role = sessionStorage.getItem('role');

  if (role === undefined || role == null) {
    return false;
  }

  if (value.indexOf(role) > -1) {
    isExist = true;
  }
  return isExist;
};

export {
  has
};
