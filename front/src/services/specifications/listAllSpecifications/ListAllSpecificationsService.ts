import http from '@/http/axios'

export function listAllSpecificationsService() {
  return http.get('/specifications/')
}
