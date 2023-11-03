import { CreateNewCategory } from '@/components/screens/Management/CategoriesManagement/CreateNewCategory'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function CreateNewCategoryPage() {
  await verifyUserIsAdminService()
  return <CreateNewCategory />
}
