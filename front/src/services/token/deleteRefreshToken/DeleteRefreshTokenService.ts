'use server'
import { cookies } from 'next/headers'
const TOKEN_KEY = ':rental: [TOKEN]'

export async function deleteRefreshTokenService(): Promise<void> {
  cookies().delete(TOKEN_KEY)
  globalThis?.localStorage?.removeItem(TOKEN_KEY)
}
