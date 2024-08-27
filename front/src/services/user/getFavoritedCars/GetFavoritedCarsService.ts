import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function getFavoritedCarsService(
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.get('/users/favorite/list')
}
