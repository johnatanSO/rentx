import http from '@/http/axios'

export function getAllRentalsService() {
  return http.get('/rentals/all/')
}
