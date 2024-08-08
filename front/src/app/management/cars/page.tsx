import { CarsManagement } from '@/components/screens/Management/CarsManagement'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default function CarsPage() {
  verifyUserIsAdminService()

  return <CarsManagement />
}
