import http from '@/http/axios'

interface IGetAvaliableCars {
  name: string
  categoryId: string
}

export function getAvaliableCarsService({
  name,
  categoryId,
}: IGetAvaliableCars) {
  return http.get('/cars/avaliable', {
    params: {
      name,
      categoryId,
    },
  })
}
