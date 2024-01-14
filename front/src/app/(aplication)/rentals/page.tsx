import { Rentals } from '@/components/screens/Rentals'
import { verifyUserSessionService } from '@/services/user/verifyUserSession/VerifyUserSessionService'

export default async function RentalsPage() {
  await verifyUserSessionService()

  return <Rentals />
}
