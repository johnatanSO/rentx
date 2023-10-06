import { getTokenService } from '@/services/token/GetTokenService'
import axios from 'axios'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_END_POINT,
  headers: {},
})

http.interceptors.request.use(
  (config: any) => {
    const token = getTokenService()
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token,
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
