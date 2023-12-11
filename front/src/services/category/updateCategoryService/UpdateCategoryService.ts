import http from '@/http/axios'

interface IRequest {
  _id: string
  name: string
  description: string
}

export function updateCategoryService({ _id, name, description }: IRequest) {
  return http.put(`/categories/${_id}`, {
    name,
    description,
  })
}
