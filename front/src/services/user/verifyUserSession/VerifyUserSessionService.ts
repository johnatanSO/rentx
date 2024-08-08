import { redirect } from 'next/navigation'
import { getLocalUserService } from '../getLocalUser/GetLocalUserService'

export function verifyUserSessionService() {
  const user = getLocalUserService()

  if (!user) redirect('/authenticate')

  return user
}
