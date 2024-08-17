import { http } from '@/http/axios'

export function deleteCarService(carId: string) {
  return http.delete('/cars/' + carId)
}
