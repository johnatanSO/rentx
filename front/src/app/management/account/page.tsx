import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default async function AccountPage() {
  await verifyUserIsAdminService()
  return <h1>Account configs</h1>
}
