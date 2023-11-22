import http from '@/http/axios'

interface IRequest {
  _id: string
  name: string
  description: string
}

export function updateCarInfosService({ _id, name, description }: IRequest) {
  const body = {
    name,
    description,
  }

  return http.put(`/cars/${_id}`, body)
}
