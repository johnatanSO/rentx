import { FavoritedCars } from '@/components/screens/FavoritedCars'
import { getFavoritedCarsService } from '@/services/user/getFavoritedCars/GetFavoritedCarsService'
import { verifyUserSessionService } from '@/services/user/verifyUserSession/VerifyUserSessionService'

export default async function FavoritedsPage() {
  await verifyUserSessionService()
  console.log('user geted')
  const { data } = await getFavoritedCarsService()
  const favoritedCars = data?.items
  console.log('favorites geted')

  return <FavoritedCars favoritedCars={favoritedCars} />
}
