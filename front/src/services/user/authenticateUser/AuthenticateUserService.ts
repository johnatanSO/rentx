import { http } from '@/http/axios'

interface IRequest {
  email: string
  password: string
}

export async function authenticateUserService({ email, password }: IRequest) {
  return http.post('/sessions', {
    email,
    password,
  })
}
