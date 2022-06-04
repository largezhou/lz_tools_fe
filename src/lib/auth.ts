import { TEND_TO_KEY, TOKEN_STORE_KEY } from '@/lib/consts'
import { RouteLocationNormalized } from 'vue-router'

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_STORE_KEY, token)
}

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORE_KEY)
}

export const recordTendTo = (to: RouteLocationNormalized) => {
  localStorage.setItem(TEND_TO_KEY, to.fullPath)
}

export const isLoggedIn = (): boolean => {
  const token = getToken()
  return (token !== null) && (token.trim().length !== 0)
}

export const redirectTendTo = () => {
  const url = localStorage.getItem(TEND_TO_KEY)
  if (url !== null && url.trim().length !== 0) {
    localStorage.removeItem(TEND_TO_KEY)
    location.href = url
  }
}
