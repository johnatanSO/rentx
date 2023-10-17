import http from '@/http/axios'

export function getAllCarsService() {
  return http.get('/cars')
}
