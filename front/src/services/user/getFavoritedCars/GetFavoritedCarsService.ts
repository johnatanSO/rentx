import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function getFavoritedCarsService() {
  return http.get('/users/favorite/list')
}
