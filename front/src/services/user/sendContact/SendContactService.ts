import http from '@/http/axios'

interface IRequest {
  name: string
  email: string
  message: string
}

export function sendContactService({ name, email, message }: IRequest) {
  const body = {
    name,
    email,
    message,
  }

  return http.post('/user/contact', body)
}
