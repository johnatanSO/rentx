import http from '@/http/axios'

interface IGetAvaliableCars {
  name: string
  categoryId: string
}

export function getAvaliableCarsService({
  name,
  categoryId,
}: IGetAvaliableCars) {
  const params = {
    ...(name ? { name } : {}),
    ...(categoryId ? { categoryId } : {}),
  }

  return http.get('/cars/avaliable', {
    params,
  })
}
