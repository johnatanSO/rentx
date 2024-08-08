import { AllRentalsManagement } from '@/components/screens/Management/AllRentalsManagement'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default function AllRentalsPage() {
  verifyUserIsAdminService()

  return <AllRentalsManagement />
}
