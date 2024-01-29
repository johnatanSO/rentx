import http from '@/http/axios'

export function sendForgotPasswordService(email: string) {
  return http.post('/password/forgot', {
    email,
  })
}
