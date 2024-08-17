import { HttpStatusCode } from '@/models/enums/HttpStatusCode'

export interface HttpResponse {
  statusCode: HttpStatusCode
  data?: any
}

export interface IHttpClientProvider {
  get(url: string, options?: any): Promise<HttpResponse>
  post(url: string, options?: any): Promise<HttpResponse>
  put(url: string, options?: any): Promise<HttpResponse>
  patch(url: string, options?: any): Promise<HttpResponse>
  delete(url: string, options?: any): Promise<HttpResponse>
}
