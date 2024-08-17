import { http } from '@/http/axios'

export function getCarDetailsService(carId: string) {
  return http.get('/cars/' + carId)
}
