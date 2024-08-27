import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function getUsersService(httpClientProvider: IHttpClientProvider) {
  return httpClientProvider.get('/users/list/')
}
