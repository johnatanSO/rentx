import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function sendForgotPasswordService(
  email: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.post('/password/forgot', {
    email,
  })
}
