import http from '@/http/axios'

interface IRequest {
  carImage: string
  carId: string
}

export async function updateCarImagesService({ carImage, carId }: IRequest) {
  const formData = new FormData()

  formData.append('images', carImage)

  return await http.patch(`/cars/images/${carId}`, formData)
}
