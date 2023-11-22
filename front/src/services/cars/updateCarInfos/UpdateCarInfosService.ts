import http from '@/http/axios'

interface IRequest {
  name: string
}

export function updateCarInfosService({ name }: IRequest) {
  const body = {
    name,
  }

  return http.put('/cars/', body)
}
