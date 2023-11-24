import http from '@/http/axios'

interface IRequest {
  _id: string
  name: string
  description: string
  dailyRate: number
  avaliable: boolean
  licensePlate: string
  fineAmount: number
  brand: string
  categoryId: string
  reasonUnavaliable?: string
}

export function updateCarInfosService({
  _id,
  name,
  description,
  dailyRate,
  avaliable,
  licensePlate,
  fineAmount,
  brand,
  categoryId,
  reasonUnavaliable,
}: IRequest) {
  const body = {
    name,
    description,
    dailyRate,
    avaliable,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    reasonUnavaliable,
  }

  return http.put(`/cars/${_id}`, body)
}
