import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function getUsersService(httpClientProvider: IHttpClientProvider) {
  return httpClientProvider.get('/users/list/')
}
