import { http } from '@/http/axios'

interface IRequest {
  _id: string
  car: string
  user: string
  startDate: string | Date
  expectedReturnDate: string | Date
}

export function updateRentalService({
  _id,
  car,
  user,
  startDate,
  expectedReturnDate,
}: IRequest) {
  const body = {
    car,
    user,
    startDate,
    expectedReturnDate,
  }

  return http.put(`/rentals/${_id}`, body)
}
