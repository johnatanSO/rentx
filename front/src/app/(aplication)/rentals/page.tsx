import { Rentals } from '@/components/screens/Rentals'
import { getRentalsService } from '@/services/rentals/getRentals/GetRentalsService'

export default async function RentalsPage() {
  const { data } = await getRentalsService()
  const allRentals = data.items

  return <Rentals rentals={allRentals} />
}
