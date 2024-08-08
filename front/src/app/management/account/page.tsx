import { verifyUserIsAdminService } from '@/services/user/verifyUserIsAdmin/VerifyUserIsAdminService'

export default function AccountPage() {
  verifyUserIsAdminService()
  return <h1>Account configs</h1>
}
