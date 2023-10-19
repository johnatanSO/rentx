'use server'
import { cookies } from 'next/headers'
const USER_KEY = ':user: [INFO]'

interface IRequest {
  userData: {
    name: string
    email: string
    isAdmin: boolean
  }
}

export async function saveLocalUserService({ userData }: IRequest) {
  globalThis?.localStorage?.setItem(USER_KEY, JSON.stringify(userData))
  cookies().set({
    name: USER_KEY,
    value: JSON.stringify(userData),
  })
}
