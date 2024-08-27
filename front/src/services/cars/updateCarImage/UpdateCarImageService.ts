import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  carImage: File
  carId: string
}

export function updateCarImageService(
  { carImage, carId }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const formData = new FormData()

  formData.append('image', carImage)

  return httpClientProvider.patch(`/cars/images/${carId}`, formData)
}
