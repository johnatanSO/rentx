import http from '@/http/axios'

interface IRequest {
  email: string
  password: string
}

export function getLocalUserService({ email, password }: IRequest) {
  return http.post('/sessions', {
    body: {
      email,
      password,
    },
  })
}
