import http from '@/http/axios'

export function deleteCategoryService(categoryId: string) {
  return http.delete(`/categories/${categoryId}`)
}
