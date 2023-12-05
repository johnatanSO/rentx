import { FavoritedCars } from '@/components/screens/FavoritedCars'
import { getFavoritedCarsService } from '@/services/user/getFavoritedCars/GetFavoritedCarsService'
import { verifyUserSessionService } from '@/services/user/verifyUserSession/VerifyUserSessionService'

export default async function FavoritedsPage() {
  await verifyUserSessionService()

  const { data } = await getFavoritedCarsService()
  const favoritedCars = data.items

  return <FavoritedCars favoritedCars={favoritedCars} />
}
