import http from '@/http/axios'

export function getUsersService() {
  return http.get('/all/')
}
