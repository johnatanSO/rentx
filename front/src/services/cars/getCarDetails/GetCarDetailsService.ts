import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function getCarDetailsService(carId: string) {
  return http.get('/cars/' + carId)
}
