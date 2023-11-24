import { FavoritedCars } from '@/components/screens/FavoritedCars'
import { verifyUserSessionService } from '@/services/user/verifyUserSession/VerifyUserSessionService'

export default async function FavoritedsPage() {
  await verifyUserSessionService()
  return <FavoritedCars />
}
