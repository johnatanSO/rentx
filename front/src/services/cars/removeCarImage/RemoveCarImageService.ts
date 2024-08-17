import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

interface IRequest {
  carId: string
  imageId: string
}

export function removeCarImageService({ carId, imageId }: IRequest) {
  return http.delete(`/cars/images/${carId}/${imageId}`)
}
