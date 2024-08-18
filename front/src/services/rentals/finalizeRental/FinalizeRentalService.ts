import { IHttpClientProvider } from '@/providers/httpClientProvider/IHttpClientProvider'

export function finalizeRentalService(
  rentalId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.put(`/rentals/finalizeRental/${rentalId}`)
}
