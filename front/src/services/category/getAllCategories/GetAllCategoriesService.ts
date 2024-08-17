import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function getAllCategoriesService(
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.get('/categories/')
}
