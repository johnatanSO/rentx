import { AllRentalsManagement } from '@/components/screens/Management/AllRentalsManagement'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function AllRentalsPage() {
  await verifyUserIsAdminService()

  return <AllRentalsManagement />
}
