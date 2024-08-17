import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function favoriteCarService(carId: string) {
  return http.post(`/cars/favorite/${carId}`)
}
