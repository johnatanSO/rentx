import { Rentals } from '@/components/screens/Rentals'
import { getRentalsService } from '@/services/rentals/getRentals/GetRentalsService'
import { verifyUserSessionService } from '@/services/user/verifyUserSession/VerifyUserSessionService'

export default async function RentalsPage() {
  await verifyUserSessionService()
  console.log('user geted')
  const { data } = await getRentalsService()
  const allRentals = data?.items
  console.log('rentals geted')

  return <Rentals rentals={allRentals} />
}
