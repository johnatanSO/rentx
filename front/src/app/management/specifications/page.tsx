import { SpecificationsManagement } from '@/components/screens/Management/SpecificationsManagement'
import { listAllSpecificationsService } from '@/services/specifications/listAllSpecifications/ListAllSpecificationsService'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function SpecificationsPage() {
  await verifyUserIsAdminService()

  const { data } = await listAllSpecificationsService()
  const allSpecifications = data.items

  return <SpecificationsManagement allSpecifications={allSpecifications} />
}
