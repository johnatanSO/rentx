import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function getCarDetailsService(
  carId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.get('/cars/' + carId)
}
