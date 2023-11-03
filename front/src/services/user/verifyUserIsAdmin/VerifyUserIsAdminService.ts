import { redirect } from 'next/navigation'
import { getLocalUserService } from '../getLocalUser/GetLocalUserService'

export async function verifyUserIsAdminService() {
  const user = await getLocalUserService()

  if (!user) redirect('/')

  const userHasAdminPermission = !!user.isAdmin

  if (!userHasAdminPermission) redirect('/')
}
