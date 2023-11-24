import { redirect } from 'next/navigation'
import { verifyUserSessionService } from '../verifyUserSession/VerifyUserSessionService'

export async function verifyUserIsAdminService() {
  const user = await verifyUserSessionService()

  const userHasAdminPermission = !!user.isAdmin

  if (!userHasAdminPermission) redirect('/')
}
