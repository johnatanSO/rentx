import http from '@/http/axios'

interface IRequest {
  defaultImage: File
  carId: string
}

export async function updateDefaultCarImageService({
  defaultImage,
  carId,
}: IRequest) {
  const formData = new FormData()

  formData.append('defaultImage', defaultImage)

  return await http.patch(`/cars/images/default/${carId}`, formData)
}
