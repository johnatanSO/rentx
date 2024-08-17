import { http } from '@/http/axios'

interface IRequest {
  name: string
  description: string
}

export function createSpecificationService({ name, description }: IRequest) {
  const body = { name, description }

  return http.post('/specifications/', {
    ...body,
  })
}
