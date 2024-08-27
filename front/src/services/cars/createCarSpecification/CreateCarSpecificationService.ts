import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  carId: string
  specificationsIds: string[]
}

export function createCarSpecificationService(
  { carId, specificationsIds }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const body = {
    specificationsIds,
  }
  return httpClientProvider.post(`/cars/specifications/${carId}`, body)
}
