import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export function finalizeRentalService(
  rentalId: string,
  httpClientProvider: IHttpClientProvider,
) {
  return httpClientProvider.put(`/rentals/finalizeRental/${rentalId}`)
}
