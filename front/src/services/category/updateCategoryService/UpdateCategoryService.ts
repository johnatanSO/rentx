import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  _id: string
  name: string
  description: string
}

export function updateCategoryService(
  { _id, name, description }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.put(`/categories/${_id}`, {
    name,
    description,
  })
}
