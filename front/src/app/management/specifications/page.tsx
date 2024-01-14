import { SpecificationsManagement } from '@/components/screens/Management/SpecificationsManagement'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function SpecificationsPage() {
  await verifyUserIsAdminService()

  return <SpecificationsManagement />
}
