import { AllRentalsManagement } from '@/components/screens/Management/AllRentalsManagement'
import { getAllRentalsService } from '@/services/rentals/getAllRentals/GetAllRentalsService'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function AllRentalsPage() {
  await verifyUserIsAdminService()

  const { data } = await getAllRentalsService()
  const allRentals = data.items

  return <AllRentalsManagement rentals={allRentals} />
}
