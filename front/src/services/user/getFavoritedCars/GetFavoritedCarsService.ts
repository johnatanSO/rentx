import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function getFavoritedCarsService(
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.get('/users/favorite/list')
}
