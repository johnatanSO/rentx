import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'

export default function CategoryPage() {
  const userInfo = getLocalUserService()

  if (!userInfo.isAdmin) return

  return <h1>Category</h1>
}
