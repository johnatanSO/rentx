import { CarsManagement } from '@/components/screens/Management/CarsManagement'
import { getAllCarsService } from '@/services/cars/getAllCars/GetAllCarsService'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function CarsPage() {
  await verifyUserIsAdminService()

  const { data } = await getAllCarsService()
  const allCars = data.items

  return <CarsManagement allCars={allCars} />
}
