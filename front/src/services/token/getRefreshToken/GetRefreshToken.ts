'use server'
import { cookies } from 'next/headers'
const REFRESH_TOKEN_KEY = ':rental: [REFRESH_TOKEN]'

export function getRefreshToken(): string | null {
  const tokenCookie = cookies().get(REFRESH_TOKEN_KEY)
  if (tokenCookie) return tokenCookie.value

  const token = globalThis?.localStorage?.getItem(REFRESH_TOKEN_KEY)
  if (token) return JSON.parse(token || 'null')

  return null
}
