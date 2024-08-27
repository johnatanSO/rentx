import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

interface IRequest {
  defaultImage: File
  carId: string
}

export function updateDefaultCarImageService(
  { defaultImage, carId }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const formData = new FormData()

  formData.append('defaultImage', defaultImage)

  return httpClientProvider.patch(`/cars/images/default/${carId}`, formData)
}
