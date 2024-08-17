// import { getRefreshToken } from '@/services/token/getRefreshToken/GetRefreshToken'
// import { getTokenService } from '@/services/token/getToken/GetTokenService'
// import axios from 'axios'

import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { IHttpClient } from './IHttpClient'

// const http1 = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_END_POINT,
// })

class HttpAxiosClient implements IHttpClient {
  private httpIntance: Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_END_POINT,
  })

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

const http = new HttpAxiosClient()

export { http }
