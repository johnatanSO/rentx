import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function updateAvatarService(avatarImage: File) {
  const formData = new FormData()
  formData.append('avatar', avatarImage)

  return http.patch('/users/avatar/', formData)
}
