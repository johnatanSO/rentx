'use server'
import { cookies } from 'next/headers'
const TOKEN_KEY = ':rental: [TOKEN]'

export function deleteTokenService() {
  cookies().delete(TOKEN_KEY)
  globalThis?.localStorage?.removeItem(TOKEN_KEY)
}
