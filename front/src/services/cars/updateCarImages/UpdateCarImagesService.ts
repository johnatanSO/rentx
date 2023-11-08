import http from '@/http/axios'

interface IRequest {
  carImage: string
  carId: string
}

export function updateCarImagesService({ carImage, carId }: IRequest) {
  const formData = new FormData()

  formData.append('images', JSON.stringify([carImage]))

  return http.post('/cars/images/' + carId, formData)
}
