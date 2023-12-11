import http from '@/http/axios'

interface IRequest {
  name: string
  description: string
  dailyRate: number
  licensePlate: string
  fineAmount: number
  brand: string
  categoryId: string
  transmission: string
  image: string
}

export function createNewCarService({
  name,
  description,
  dailyRate,
  licensePlate,
  fineAmount,
  brand,
  categoryId,
  transmission,
  image,
}: IRequest) {
  const body = {
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    transmission,
  }

  const formData = new FormData()
  formData.append('image', image)

  for (const [key, value] of Object.entries(body)) {
    formData.append(key, value.toString())
  }

  return http.post('/cars', formData)
}
