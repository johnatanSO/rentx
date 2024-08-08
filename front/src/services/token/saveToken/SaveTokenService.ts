'use server'
import { cookies } from 'next/headers'
const TOKEN_KEY = ':rental: [TOKEN]'

export function saveTokenService(token: string) {
  const oneHour = 60 * 60 * 1

  cookies().set({
    name: TOKEN_KEY,
    value: token,
    maxAge: oneHour,
  })
  globalThis?.localStorage?.setItem(TOKEN_KEY, JSON.stringify(token))
}
