import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { inputUser, isLoggedIn } from '@/lib/auth'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (!isLoggedIn()) {
    inputUser()
  }
  next()
})

export default router
