import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export async function updateRefreshTokenService(
  token: string | null,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.post('refreshToken', {
    token,
  })
}
