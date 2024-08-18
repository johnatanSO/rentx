import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export async function updateRefreshTokenService(
  token: string | null,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.post('refreshToken', {
    token,
  })
}
