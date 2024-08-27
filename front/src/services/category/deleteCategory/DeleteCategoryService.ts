import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function deleteCategoryService(
  categoryId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.delete(`/categories/${categoryId}`)
}
