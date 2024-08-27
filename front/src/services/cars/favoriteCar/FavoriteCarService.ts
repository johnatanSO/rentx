import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function favoriteCarService(
  carId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.post(`/cars/favorite/${carId}`)
}
