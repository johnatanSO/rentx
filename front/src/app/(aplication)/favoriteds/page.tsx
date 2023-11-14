import { Favoriteds } from '@/components/screens/Favoriteds'
import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'

export default async function FavoritedsPage() {
  const favoriteds = (await getLocalUserService()).favoriteCars

  return <Favoriteds favoriteds={favoriteds} />
}
