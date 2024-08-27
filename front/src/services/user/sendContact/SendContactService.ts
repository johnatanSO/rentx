import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  name: string
  email: string
  message: string
}

export function sendContactService(
  { name, email, message }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const body = {
    name,
    email,
    message,
  }

  return httpClientProvider.post('/users/contact', body)
}
