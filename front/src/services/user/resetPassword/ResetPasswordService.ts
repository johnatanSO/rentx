import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

interface IRequest {
  password: string
  confirmPassword: string
  refreshToken: string
}

export function resetPasswordService({
  refreshToken,
  password,
  confirmPassword,
}: IRequest) {
  const body = {
    password,
    confirmPassword,
  }

  return http.post('/password/reset', body, {
    params: {
      refreshToken,
    },
  })
}
