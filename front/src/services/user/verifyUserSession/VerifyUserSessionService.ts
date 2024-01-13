import { redirect } from 'next/navigation'
import { getLocalUserService } from '../getLocalUser/GetLocalUserService'

export async function verifyUserSessionService() {
  const user = await getLocalUserService()

  if (!user) redirect('/authenticate')

  return user
}
