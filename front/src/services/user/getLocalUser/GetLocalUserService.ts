'use server'
import { cookies } from 'next/headers'
const USER_KEY = ':rental: [USER_INFO]'

export async function getLocalUserService() {
  const userCookie = cookies().get(USER_KEY)
  const parsedUserCookie = JSON.parse(userCookie?.value || '{}')
  if (Object.values(parsedUserCookie).length > 0) return parsedUserCookie

  const userLocalByStorage = globalThis?.localStorage?.getItem(USER_KEY)
  if (userLocalByStorage) return JSON.parse(userLocalByStorage)

  return undefined
}
