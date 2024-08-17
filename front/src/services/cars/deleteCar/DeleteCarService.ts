import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function deleteCarService(carId: string) {
  return http.delete('/cars/' + carId)
}
