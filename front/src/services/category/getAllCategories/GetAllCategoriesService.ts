import { http } from '@/http/axios'

export function getAllCategoriesService() {
  return http.get('/categories/')
}
