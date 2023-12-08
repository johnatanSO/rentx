'use client'

import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'
import { saveLocalUserService } from '@/services/user/saveLocalUser/SaveLocalUserService'
import { ReactNode, createContext, useState, useEffect } from 'react'

interface UserInfo {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  avatar: string
  favoriteCars: string[]
}

interface UserContextComponentProps {
  children: ReactNode
  serverUserInfo: UserInfo
}

interface UserContextInterface {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo | null) => void
}

export const UserContext = createContext({} as UserContextInterface)

export function UserContextComponent({
  children,
  serverUserInfo,
}: UserContextComponentProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(
    serverUserInfo || null,
  )

  async function saveUserHandler(updatedInfos: any) {
    const localUser: any = await getLocalUserService()
    saveLocalUserService({
      userData: { ...localUser, ...updatedInfos },
    })
  }

  useEffect(() => {
    saveUserHandler(userInfo)
  }, [userInfo])

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
