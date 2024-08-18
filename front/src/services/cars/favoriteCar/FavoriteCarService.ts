import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function favoriteCarService(
  carId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.post(`/cars/favorite/${carId}`)
}
