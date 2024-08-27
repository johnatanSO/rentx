import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function deleteCarService(
  carId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.delete('/cars/' + carId)
}
