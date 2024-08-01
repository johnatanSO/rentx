// import { getRefreshToken } from '@/services/token/getRefreshToken/GetRefreshToken'
import { getTokenService } from '@/services/token/getToken/GetTokenService'
import axios from 'axios'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_END_POINT,
})

http.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: any) => {
    const token = await getTokenService()

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
