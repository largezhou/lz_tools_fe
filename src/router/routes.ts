import { RouteRecordRaw } from 'vue-router'
import GetCodeList from '@/pages/getCodeList/index.vue'
import SaveCode from '@/pages/saveCode/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: GetCodeList,
  },
  {
    path: '/save-code',
    name: 'saveCode',
    component: SaveCode,
  },
]

export default routes
