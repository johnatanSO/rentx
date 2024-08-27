import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function getAllCarsService(httpClientProvider: IHttpClientProvider) {
  return httpClientProvider.get('/cars')
}
