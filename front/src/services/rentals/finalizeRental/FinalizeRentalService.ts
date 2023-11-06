import http from '@/http/axios'

export function finalizeRentalService(rentalId: string) {
  return http.put(`/rentals/finalizeRental/${rentalId}`)
}
