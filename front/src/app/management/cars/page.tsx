import { CarsManagement } from '@/components/screens/Management/CarsManagement'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function CarsPage() {
  await verifyUserIsAdminService()
  return <CarsManagement />
}
