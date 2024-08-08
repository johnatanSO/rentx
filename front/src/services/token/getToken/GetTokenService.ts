'use server'
import { cookies } from 'next/headers'
const TOKEN_KEY = ':rental: [TOKEN]'

export function getTokenService(): string | null {
  const tokenCookie = cookies().get(TOKEN_KEY)
  if (tokenCookie) return tokenCookie.value

  const token = globalThis?.localStorage?.getItem(TOKEN_KEY)
  if (token) return JSON.parse(token || 'null')

  return null
}
