'use server'
import { cookies } from 'next/headers'
const TOKEN_KEY = ':rental: [TOKEN]'

export async function deleteTokenService(): Promise<void> {
  globalThis?.localStorage?.removeItem(TOKEN_KEY)
  cookies().delete(TOKEN_KEY)
}
