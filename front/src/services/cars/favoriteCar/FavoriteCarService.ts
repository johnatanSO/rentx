import http from '@/http/axios'

export function favoriteCarService(carId: string) {
  return http.post(`/cars/favorite/${carId}`)
}
