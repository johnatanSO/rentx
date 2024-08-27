import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IGetAvaliableCars {
  name: string | null
  categoryId: string | null
}

export function getAvaliableCarsService(
  { name, categoryId }: IGetAvaliableCars,
  httpClientProvider: IHttpClientProvider,
) {
  const params = {
    ...(name ? { name } : {}),
    ...(categoryId ? { categoryId } : {}),
  }

  return httpClientProvider.get('/cars/avaliable', {
    params,
  })
}
