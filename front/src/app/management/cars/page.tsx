import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'

export default function CarsPage() {
  const userInfo = getLocalUserService()

  if (!userInfo.isAdmin) return

  return <h1>Configurações de carros</h1>
}
