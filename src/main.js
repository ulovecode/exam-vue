// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import filters from './filters'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import stores from './stroe/store'

Vue.config.productionTip = false
Vue.use(ElementUI);
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))    //加载过滤器



router.beforeEach((to, from, next) => {
  //全局拦截器的
  if (to.meta.requiresAuth) {  // 判断该路由是否需要登录权限
    if (stores.getters.getLogin) {  // 通过store获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});


// axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL='http://localhost:8080/';
Vue.prototype.$http = axios //其他页面在使用axios的时候直接  this.$http就可以了


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  store:stores
})
