import { HomePageManagement } from '@/components/screens/Management'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default function ManagementPage() {
  verifyUserIsAdminService()

  return <HomePageManagement />
}
