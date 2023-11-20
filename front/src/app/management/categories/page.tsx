import { CategoriesManagement } from '@/components/screens/Management/CategoriesManagement'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function CategoriesPage() {
  await verifyUserIsAdminService()

  const { data } = await getAllCategoriesService()
  const allCategories = data.items

  return <CategoriesManagement categories={allCategories} />
}
