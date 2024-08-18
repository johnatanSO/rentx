import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

interface IRequest {
  _id: string
  car: string
  user: string
  startDate: string | Date
  expectedReturnDate: string | Date
}

export function updateRentalService(
  { _id, car, user, startDate, expectedReturnDate }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const body = {
    car,
    user,
    startDate,
    expectedReturnDate,
  }

  return httpClientProvider.put(`/rentals/${_id}`, body)
}
