'use server'
import { cookies } from 'next/headers'
const USER_KEY = ':user: [INFO]'

export async function getLocalUserService() {
  const userLocalByStorage = globalThis?.localStorage?.getItem(USER_KEY)
  if (userLocalByStorage) return JSON.parse(userLocalByStorage)

  const userCookie = cookies().get(USER_KEY)
  if (userCookie) return JSON.parse(userCookie.value)

  return undefined
}
