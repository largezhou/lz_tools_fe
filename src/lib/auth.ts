import { USERNAME_STORE_KEY } from '@/lib/consts'

export const setToken = (token: string) => {
  localStorage.setItem(USERNAME_STORE_KEY, token)
}

export const getToken = (): string => {
  return localStorage.getItem(USERNAME_STORE_KEY) || ''
}

export const isLoggedIn = (): boolean => {
  const token = getToken()
  return (token !== null) && (token.trim().length !== 0)
}

export const inputUser = (): string => {
  const username = prompt('输入账号')
  if (!username || username.trim().length < 3) {
    alert('账号长度为 3-20')
    return ''
  }
  setToken(username)

  return username
}
