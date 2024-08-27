import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function sendForgotPasswordService(
  email: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.post('/password/forgot', {
    email,
  })
}
