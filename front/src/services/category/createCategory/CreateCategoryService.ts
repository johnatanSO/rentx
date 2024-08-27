import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  name: string
  description: string
}

export function createCategoryService(
  { name, description }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const body = { name, description }

  return httpClientProvider.post('/categories/', {
    ...body,
  })
}
