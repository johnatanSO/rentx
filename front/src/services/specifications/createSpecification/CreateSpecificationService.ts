import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

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
