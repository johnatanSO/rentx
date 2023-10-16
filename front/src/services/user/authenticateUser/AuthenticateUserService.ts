import http from '@/http/axios'

interface IRequest {
  email: string
  password: string
}

export function authenticateUserService({ email, password }: IRequest) {
  return http.post('/sessions', {
    body: {
      email,
      password,
    },
  })
}
