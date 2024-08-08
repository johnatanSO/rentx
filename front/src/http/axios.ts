// import { getRefreshToken } from '@/services/token/getRefreshToken/GetRefreshToken'
import { deleteTokenService } from '@/services/token/deleteToken/DeleteTokenService'
import { getTokenService } from '@/services/token/getToken/GetTokenService'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_END_POINT,
})

http.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    const token = getTokenService()

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

http.interceptors.response.use(
  (config: AxiosResponse) => config,
  (error) => {
    const jwtExpired = error.response.data.message.includes('jwt expired')

    if (jwtExpired) {
      deleteTokenService()
    }
    return Promise.reject(error)
  },
)

export default http
