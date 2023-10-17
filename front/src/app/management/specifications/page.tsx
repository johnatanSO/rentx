import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'

export default function SpecificationPage() {
  const userInfo = getLocalUserService()

  if (!userInfo.isAdmin) return

  return <h1> Configurações de especificações</h1>
}
