import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import GetCodeList from '@/pages/getCodeList/index.vue'
import GetCode from '@/pages/getCode/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/get-code',
  },
  {
    path: '/get-code-list',
    name: 'getCodeList',
    component: GetCodeList,
  },
  {
    path: '/get-code',
    name: 'getCode',
    component: GetCode,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
