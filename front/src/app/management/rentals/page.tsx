import { AllRentalsManagement } from '@/components/screens/Management/AllRentalsManagement'
import { getAllRentalsService } from '@/services/rentals/getAllRentals/GetAllRentalsService'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function AllRentalsPage({ searchParams }: any) {
  await verifyUserIsAdminService()

  const { data } = await getAllRentalsService({
    userId: null,
    filterStartDate: searchParams.filterStartDate,
    filterEndDate: searchParams.filterEndDate,
  })

  const allRentals = data.items

  return <AllRentalsManagement rentals={allRentals} />
}
