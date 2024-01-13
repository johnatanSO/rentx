'use server'
import { cookies } from 'next/headers'
const TOKEN_KEY = ':rental: [TOKEN]'

export async function saveTokenService(token: string) {
  cookies().set({
    name: TOKEN_KEY,
    value: token,
    maxAge: 60 * 60 * 1, // 1 hora
  })
  globalThis?.localStorage?.setItem(TOKEN_KEY, JSON.stringify(token))
}
