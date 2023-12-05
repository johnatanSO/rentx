import http from '@/http/axios'

export function getFavoritedCarsService() {
  return http.get('/users/favorite/list')
}
