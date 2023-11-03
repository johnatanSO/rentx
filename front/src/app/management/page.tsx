import { HomePageManagement } from '@/components/screens/Management'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function ManagementPage() {
  await verifyUserIsAdminService()

  return <HomePageManagement />
}
