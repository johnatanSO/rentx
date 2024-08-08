import { CreateNewCar } from '@/components/screens/Management/CarsManagement/CreateNewCar'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default function CreateNew() {
  verifyUserIsAdminService()
  return <CreateNewCar />
}
