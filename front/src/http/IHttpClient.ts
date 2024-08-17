export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  serverError = 500,
  unauthorized = 401,
}

export interface HttpResponse {
  statusCode: HttpStatusCode
  data?: any
}

export interface IHttpClient {
  get(url: string, options?: any): Promise<HttpResponse>
  post(url: string, options?: any): Promise<HttpResponse>
  put(url: string, options?: any): Promise<HttpResponse>
  patch(url: string, options?: any): Promise<HttpResponse>
  delete(url: string, options?: any): Promise<HttpResponse>
}
