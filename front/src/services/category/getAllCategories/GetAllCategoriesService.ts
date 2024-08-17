import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function getAllCategoriesService() {
  return http.get('/categories/')
}
