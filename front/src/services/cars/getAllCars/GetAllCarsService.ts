import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function getAllCarsService(httpClientProvider: IHttpClientProvider) {
  return httpClientProvider.get('/cars')
}
