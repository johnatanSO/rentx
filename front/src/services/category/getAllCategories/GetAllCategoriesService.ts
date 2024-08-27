import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function getAllCategoriesService(
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.get('/categories/')
}
