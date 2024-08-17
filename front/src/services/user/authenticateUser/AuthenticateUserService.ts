import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

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
