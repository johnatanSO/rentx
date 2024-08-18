import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

interface IRequest {
  carId: string
  expectedReturnDate: Date | string
}

export function createRentalService(
  { carId, expectedReturnDate }: IRequest,
  httpClientProvider: IHttpClientProvider,
) {
  const body = {
    carId,
    expectedReturnDate,
  }

  return httpClientProvider.post('/rentals', {
    ...body,
  })
}
