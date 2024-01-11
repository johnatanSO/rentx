'use server'

import { cookies } from 'next/headers'
const REFRESH_TOKEN_KEY = ':rental: [REFRESH_TOKEN]'

export async function saveRefreshToken(token: string) {
  cookies().set({
    name: REFRESH_TOKEN_KEY,
    value: token,
  })
  globalThis?.localStorage?.setItem(REFRESH_TOKEN_KEY, JSON.stringify(token))
}
