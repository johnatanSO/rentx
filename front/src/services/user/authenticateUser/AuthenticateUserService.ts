import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  email: string
  password: string
}

export async function authenticateUserService(
  { email, password }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.post('/sessions', {
    email,
    password,
  })
}
