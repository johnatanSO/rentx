import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function deleteCategoryService(
  categoryId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.delete(`/categories/${categoryId}`)
}
