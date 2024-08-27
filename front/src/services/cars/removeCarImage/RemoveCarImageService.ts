import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  carId: string
  imageId: string
}

export function removeCarImageService(
  { carId, imageId }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.delete(`/cars/images/${carId}/${imageId}`)
}
