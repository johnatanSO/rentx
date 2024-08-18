import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function deleteCarService(
  carId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.delete('/cars/' + carId)
}
