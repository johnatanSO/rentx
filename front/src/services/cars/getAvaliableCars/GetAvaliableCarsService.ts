import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

interface IGetAvaliableCars {
  name: string | null
  categoryId: string | null
}

export function getAvaliableCarsService(
  { name, categoryId }: IGetAvaliableCars,
  instance: IHttpClientProvider,
) {
  const params = {
    ...(name ? { name } : {}),
    ...(categoryId ? { categoryId } : {}),
  }

  return instance.get('/cars/avaliable', {
    params,
  })
}
