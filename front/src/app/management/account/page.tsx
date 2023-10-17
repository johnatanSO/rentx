import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'

export default function AccountPage() {
  const userInfo = getLocalUserService()

  if (!userInfo.isAdmin) return

  return <h1>Account configs</h1>
}
