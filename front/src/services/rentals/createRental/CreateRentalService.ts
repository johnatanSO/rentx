import http from '@/http/axios'

interface IRequest {
  carId: string
  expectedReturnDate: Date
}

export function createRentalService({ carId, expectedReturnDate }: IRequest) {
  const body = {
    carId,
    expectedReturnDate,
  }

  return http.post('/rentals', {
    ...body,
  })
}
