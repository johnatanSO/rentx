import { redirect } from 'next/navigation'
import { verifyUserSessionService } from '../verifyUserSession/VerifyUserSessionService'

export function verifyUserIsAdminService() {
  const user = verifyUserSessionService()

  const userHasAdminPermission = !!user.isAdmin

  if (!userHasAdminPermission) redirect('/')
}
