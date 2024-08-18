import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function listAllSpecificationsService(
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.get('/specifications/')
}
