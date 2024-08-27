import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  name: string
  description: string
}

export function createSpecificationService(
  { name, description }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const body = { name, description }

  return httpClientProvider.post('/specifications/', {
    ...body,
  })
}
