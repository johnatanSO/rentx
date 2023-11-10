import http from '@/http/axios'

interface IRequest {
  carId: string
  specificationsIds: string[]
}

export function createCarSpecificationService({
  carId,
  specificationsIds,
}: IRequest) {
  const body = {
    specificationsIds,
  }
  return http.post(`/cars/specifications/${carId}`, body)
}
