import Vue from 'vue'
import Router from 'vue-router'
// 解决路由跳转相同的地址报错
const originalPush = Router.prototype.push;
Router.prototype.push = function (location) {
  try {
    return originalPush.call(this, location).catch(err => err);
  } catch (error) {
    console.error(error);
  }
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'home' },
      component: () => import('@/views/home/index'),
      redirect: '/loadManage',
      children: [
        {
          path: '/loadManage',
          name: 'loadManage',
          meta: { title: '' },
          component: () => import('@/views/home/loadManage')
        }
      ]
    }
  ]
})
