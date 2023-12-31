import http from '@/http/axios'

interface IRequest {
  _id: string
  name: string
  description: string
}

export function updateSpecificationService({
  _id,
  name,
  description,
}: IRequest) {
  return http.put(`/specifications/${_id}`, {
    name,
    description,
  })
}
