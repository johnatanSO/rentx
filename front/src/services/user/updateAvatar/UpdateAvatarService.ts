import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function updateAvatarService(
  avatarImage: File,
  httpClientProvider: IHttpClientProvider,
) {
  const formData = new FormData()
  formData.append('avatar', avatarImage)

  return httpClientProvider.patch('/users/avatar/', formData)
}
