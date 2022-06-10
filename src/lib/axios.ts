import axios from 'axios'
import { getToken } from '@/lib/auth'
import config from '@/lib/config'

const instance = axios.create({
  baseURL: config.baseUrl,
  timeout: config.timeout || 5000,
})

instance.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {}
    }

    const token = getToken()
    if (token) {
      config.headers.Username = token
    }

    return config
  },
)

export default instance
