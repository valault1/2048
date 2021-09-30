import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "capture" */ '@/views/Game.vue')
  }
]

const router = new VueRouter({
  mode: 'history', //removed to try and fix blank page when building prod
  base: process.env.BASE_URL,
  routes
})

export default router
