import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function getAllCarsService() {
  return http.get('/cars')
}
