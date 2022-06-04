import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { LOGIN_ROUTE_NAME } from '@/lib/consts'
import { jumpToAuth } from '@/hooks/useWechatAuth'
import { isLoggedIn, recordTendTo } from '@/lib/auth'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if ((to.meta.auth && isLoggedIn()) || !to.meta.auth) {
    next()
  } else {
    recordTendTo(to)
    await jumpToAuth(location.origin + router.resolve({ name: LOGIN_ROUTE_NAME }).fullPath)
    return false
  }
})

export default router
