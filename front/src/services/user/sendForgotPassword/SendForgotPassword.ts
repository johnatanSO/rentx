import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function sendForgotPasswordService(email: string) {
  return http.post('/password/forgot', {
    email,
  })
}
