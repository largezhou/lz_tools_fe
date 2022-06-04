import { RouteRecordRaw } from 'vue-router'
import GetCodeList from '@/pages/getCodeList/index.vue'
import GetCode from '@/pages/getCode/index.vue'
import Login from '@/pages/login/index.vue'
import { LOGIN_ROUTE_NAME } from '@/lib/consts'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/get-code',
  },
  {
    path: '/get-code-list',
    name: 'getCodeList',
    component: GetCodeList,
    meta: {
      auth: true,
    },
  },
  {
    path: '/get-code',
    name: 'getCode',
    component: GetCode,
    meta: {
      auth: true,
    },
  },
  {
    path: '/login',
    name: LOGIN_ROUTE_NAME,
    component: Login,
  },
]

export default routes
