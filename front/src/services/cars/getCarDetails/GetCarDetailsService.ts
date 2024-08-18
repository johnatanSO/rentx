import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function getCarDetailsService(
  carId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.get('/cars/' + carId)
}
