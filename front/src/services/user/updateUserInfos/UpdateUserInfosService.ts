import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

interface IRequest {
  name: string
  email: string
  isAdmin: boolean
}

export function updateUserInfosService(
  { name, email, isAdmin }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const body = {
    name,
    email,
    isAdmin,
  }

  return httpClientProvider.put('/users/', body)
}
