import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  _id: string
  name: string
  description: string
}

export function updateSpecificationService(
  { _id, name, description }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.put(`/specifications/${_id}`, {
    name,
    description,
  })
}
