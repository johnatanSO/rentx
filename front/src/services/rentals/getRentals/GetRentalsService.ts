import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function getRentalsService() {
  return http.get('/rentals')
}
