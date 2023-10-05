import http from '@/http/axios'

export function getAvaliableCarsService() {
  return http.get('/cars/avaliable')
}
