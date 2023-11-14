'use client'

import { ReactNode, createContext, useState } from 'react'

interface Car {
  _id: string
}

interface UserInfo {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  avatar: string
  favoriteCars: Car[]
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
