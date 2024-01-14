import { CategoriesManagement } from '@/components/screens/Management/CategoriesManagement'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function CategoriesPage() {
  await verifyUserIsAdminService()

  return <CategoriesManagement />
}
