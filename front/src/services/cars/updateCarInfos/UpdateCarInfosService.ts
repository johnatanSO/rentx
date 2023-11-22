import http from '@/http/axios'

interface IRequest {
  _id: string
  name: string
}

export function updateCarInfosService({ name, _id }: IRequest) {
  const body = {
    _id,
    name,
  }

  return http.put('/cars/', body)
}
