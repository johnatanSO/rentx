import { CreateNewSpecification } from '@/components/screens/Management/SpecificationsManagement/CreateNewSpecification'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function CreateNewSpecificationPage() {
  await verifyUserIsAdminService()

  return <CreateNewSpecification />
}
