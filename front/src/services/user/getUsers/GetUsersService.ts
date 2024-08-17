import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function getUsersService() {
  return http.get('/users/list/')
}
