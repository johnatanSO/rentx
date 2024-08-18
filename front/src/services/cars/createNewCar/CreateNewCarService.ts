import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

interface IRequest {
  name: string
  description: string
  dailyRate: number
  licensePlate: string
  fineAmount: number
  brand: string
  categoryId: string
  transmission: string
  image: File | null
}

export function createNewCarService(
  {
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    transmission,
    image,
  }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
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
  if (image) formData.append('image', image)

  for (const [key, value] of Object.entries(body)) {
    formData.append(key, value.toString())
  }

  return httpClientProvider.post('/cars', formData)
}
