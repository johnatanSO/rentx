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

  return http.post('/cars', body)
}
