import { CategoriesManagement } from '@/components/screens/Management/CategoriesManagement'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default function CategoriesPage() {
  verifyUserIsAdminService()

  return <CategoriesManagement />
}
