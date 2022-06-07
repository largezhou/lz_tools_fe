import axios from 'axios'
import { getToken } from '@/lib/auth'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_TIMEOUT || 5000,
})

instance.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {}
    }

    const token = getToken()
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  },
)

export default instance
