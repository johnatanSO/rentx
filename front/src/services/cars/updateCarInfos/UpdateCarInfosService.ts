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
  transmission: string
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
  transmission,
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
    transmission,
  }

  return http.put(`/cars/${_id}`, body)
}
