import http from '@/http/axios'

interface IGetAvaliableCars {
  name: string | null
  categoryId: string | null
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
