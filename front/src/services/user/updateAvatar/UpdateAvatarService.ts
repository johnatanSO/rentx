import http from '@/http/axios'

export function updateAvatarService(avatarImage: any) {
  const formData = new FormData()
  formData.append('avatar', avatarImage)

  return http.patch('/users/avatar/', formData)
}
