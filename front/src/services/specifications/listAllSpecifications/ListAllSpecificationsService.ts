import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function listAllSpecificationsService(
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.get('/specifications/')
}
