import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

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

  return http.post('/users/contact', body)
}
