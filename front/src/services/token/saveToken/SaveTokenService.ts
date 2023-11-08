'use server'
import { cookies } from 'next/headers'
const TOKEN_KEY = ':rental: [TOKEN]'

export async function saveTokenService(token: string) {
  globalThis?.localStorage?.setItem(TOKEN_KEY, JSON.stringify(token))
  cookies().set({
    name: TOKEN_KEY,
    value: token,
  })
}
