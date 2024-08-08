'use server'
import { cookies } from 'next/headers'
const USER_KEY = ':rental: [USER_INFO]'

export function getLocalUserService() {
  const userCookie = cookies().get(USER_KEY)
  const parsedUserCookie = JSON.parse(userCookie?.value || 'null')
  if (parsedUserCookie) return parsedUserCookie

  const userLocalStorage = globalThis?.localStorage?.getItem(USER_KEY)
  const parsedUserLocalStorage = JSON.parse(userLocalStorage || 'null')
  if (parsedUserLocalStorage) return parsedUserLocalStorage

  return null
}
