import { http } from '@/providers/httpClientProvider/AxiosHttpClientProvider'

export function finalizeRentalService(rentalId: string) {
  return http.put(`/rentals/finalizeRental/${rentalId}`)
}
