import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function getRentalsService(httpClientProvider: IHttpClientProvider) {
  return httpClientProvider.get('/rentals')
}
