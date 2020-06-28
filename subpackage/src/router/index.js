import Vue from 'vue'
import VueRouter from 'vue-router'
import route_login from './login'
import route_order from './order'
import route_ticket from './ticket'
import route_hotel from './hotel'

import Login from '@/views/login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    meta: {
      title:'登录'
    },
    redirect:'/login',
    component: Login
  },
  {
    path: '/home',
    meta: {
      title:'主页'
    },
    component: () => import('@/views/Home.vue')
  },
  ...route_login,
  ...route_order,
  ...route_ticket,
  ...route_hotel
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{ // 路由全局拦截
  next();
});

export default router
