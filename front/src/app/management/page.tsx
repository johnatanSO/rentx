import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'

export default async function ManagementPage() {
  const userInfo = getLocalUserService()

  if (!userInfo.isAdmin) return

  return <h1>Gestão</h1>
}
