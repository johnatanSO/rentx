import { SpecificationsManagement } from '@/components/screens/Management/SpecificationsManagement'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default function SpecificationsPage() {
  verifyUserIsAdminService()

  return <SpecificationsManagement />
}
