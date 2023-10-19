'use server'
import { cookies } from 'next/headers'
const USER_KEY = ':user: [INFO]'

export async function deleteLocalUserService() {
  globalThis?.localStorage?.removeItem(USER_KEY)
  cookies().delete(USER_KEY)
}
