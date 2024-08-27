import { IHttpClientProvider } from '../../../providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  password: string
  confirmPassword: string
  refreshToken: string
}

export function resetPasswordService(
  { refreshToken, password, confirmPassword }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const body = {
    password,
    confirmPassword,
  }

  return httpClientProvider.post('/password/reset', body, {
    params: {
      refreshToken,
    },
  })
}
