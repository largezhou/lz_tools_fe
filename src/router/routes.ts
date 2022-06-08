import { RouteRecordRaw } from 'vue-router'
import GetCodeList from '@/pages/getCodeList/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: GetCodeList,
  },
]

export default routes
