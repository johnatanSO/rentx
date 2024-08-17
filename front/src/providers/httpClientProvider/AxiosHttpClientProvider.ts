import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { IHttpClientProvider } from './IHttpClientProvider'
import { getTokenService } from '@/services/token/getToken/GetTokenService'

class HttpAxiosClientProvider implements IHttpClientProvider {
  private httpIntance: Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_END_POINT,
  })

  constructor() {
    this.httpIntance.interceptors.request.use(
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
  }

  async post(url: string, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.post(url, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async put(url: string, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.put(url, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async get(url: string, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.get(url, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async patch(url: string, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.patch(url, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async delete(url: string, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.delete(url, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }
}

const http = new HttpAxiosClientProvider()

export { http }
