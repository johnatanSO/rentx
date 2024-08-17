import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function deleteCategoryService(categoryId: string) {
  return http.delete(`/categories/${categoryId}`)
}
