'use client'
import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'
import { ReactNode, createContext, useState, useEffect } from 'react'

interface UserInfo {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  avatar: string
}

interface UserContextComponentProps {
  children: ReactNode
}

interface UserContextInterface {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo | null) => void
}

export const UserContext = createContext({} as UserContextInterface)

export function UserContextComponent({ children }: UserContextComponentProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  function getUserInfo() {
    const userData = getLocalUserService()

    setUserInfo(userData)
  }

  useEffect(() => {
    getUserInfo()
  }, [])

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
