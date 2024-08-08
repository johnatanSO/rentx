import { Rentals } from '@/components/screens/Rentals'
import { verifyUserSessionService } from '@/services/user/verifyUserSession/VerifyUserSessionService'

export default function RentalsPage() {
  verifyUserSessionService()

  return <Rentals />
}
