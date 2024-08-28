import { AlertContext } from '@/contexts/alertContext'
import { UserContext } from '@/contexts/userContext'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { favoriteCarService } from '@/services/cars/favoriteCar/FavoriteCarService'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

type Props = {
  carId: string
}

export function useFavorite({ carId }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const { userInfo, setUserInfo } = useContext(UserContext)
  const router = useRouter()

  const favorited = userInfo
    ? !!userInfo?.favoriteCars?.find((favoriteCarId) => favoriteCarId === carId)
    : false

  function favoriteCar(carId: string) {
    if (!userInfo) {
      router.push('/authenticate')
      return
    }

    favoriteCarService(carId, httpClientProvider)
      .then((res) => {
        setUserInfo({
          ...userInfo,
          ...res.data.user,
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar favoritar o carro - ${err?.message}`,
          type: 'error',
        })
      })
  }

  return {
    favorited,
    favoriteCar,
  }
}
