import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function getRentalsService(httpClientProvider: IHttpClientProvider) {
  return httpClientProvider.get('/rentals')
}
