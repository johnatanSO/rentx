import { http } from '@/http/axios'

interface IRequest {
  name: string
  email: string
  isAdmin: boolean
}

export function updateUserInfosService({ name, email, isAdmin }: IRequest) {
  const body = {
    name,
    email,
    isAdmin,
  }

  return http.put('/users/', body)
}
