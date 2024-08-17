import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function listAllSpecificationsService() {
  return http.get('/specifications/')
}
