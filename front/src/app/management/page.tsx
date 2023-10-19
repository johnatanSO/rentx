import { HomePageManagement } from '@/components/screens/Management'
import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'
import { redirect } from 'next/navigation'

export default async function ManagementPage() {
  const userHasAdminPermission = (await getLocalUserService()).isAdmin

  if (!userHasAdminPermission) redirect('/')
  return <HomePageManagement />
}
