import { FavoritedCars } from '@/components/screens/FavoritedCars'
import { HttpStatusCode } from '@/models/enums/HttpStatusCode'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { getFavoritedCarsService } from '@/services/user/getFavoritedCars/GetFavoritedCarsService'
import { verifyUserSessionService } from '@/services/user/verifyUserSession/VerifyUserSessionService'

export default async function FavoritedsPage() {
  await verifyUserSessionService()

  let favoritedCars = []

  const { data, statusCode } = await getFavoritedCarsService(httpClientProvider)

  if (statusCode === HttpStatusCode.ok) favoritedCars = data.items

  return <FavoritedCars favoritedCars={favoritedCars} />
}
