import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Game from '../page/home/index.vue'
import Login from '../page/login/index.vue'

import NotFoundComponent from '../page/error/404.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/game',
    name: 'Game',
    component: Game,
    meta: {
      title: '游戏页面',
    },
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录页面',
    },
  },

  {
    path: '/404',
    name: '404',
    component: NotFoundComponent,
    meta: {
      title: '404',
    },
  },
  // pathMatch is the name of the param, e.g., going to /not/found yields
  // { params: { pathMatch: ['not', 'found'] }}
  // this is thanks to the last *, meaning repeated params and it is necessary if you
  // plan on directly navigating to the not-found route using its name
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundComponent },
  // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
  {
    path: '/:pathMatch(.*)',
    name: 'bad-not-found',
    component: NotFoundComponent,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//路由优化，最后再做
// router.beforeEach((from, to, next) => {})

export default router
