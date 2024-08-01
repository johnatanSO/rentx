import http from '@/http/axios'

interface IRequest {
  carImage: File
  carId: string
}

export async function updateCarImageService({ carImage, carId }: IRequest) {
  const formData = new FormData()

  formData.append('image', carImage)

  return await http.patch(`/cars/images/${carId}`, formData)
}
