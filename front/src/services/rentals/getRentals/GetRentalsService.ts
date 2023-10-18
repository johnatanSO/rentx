import http from '@/http/axios'

export function getRentalsService() {
  return http.get('/rentals')
}
