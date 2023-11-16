import http from '@/http/axios'

interface IRequest {
  name: string
  email: string
}

export function updateUserInfosService({ name, email }: IRequest) {
  return http.put('/users/')
}
