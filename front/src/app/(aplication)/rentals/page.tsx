import { Rentals } from '@/components/screens/Rentals'
import { getRentalsService } from '@/services/rentals/getRentals/GetRentalsService'
import { verifyUserSessionService } from '@/services/user/verifyUserSession/VerifyUserSessionService'

export default async function RentalsPage() {
  await verifyUserSessionService()

  const { data } = await getRentalsService()
  const allRentals = data?.items

  return <Rentals rentals={allRentals} />
}
