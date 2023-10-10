import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'
import { ReactNode, createContext, useState } from 'react'

interface UserInfo {
  _id: string
  name: string
  email: string
  isAdmin: boolean
}

interface UserContextComponentProps {
  children: ReactNode
}

interface UserContextInterface {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo) => void
}

export const UserContext = createContext({} as UserContextInterface)

export async function UserContextComponent({
  children,
}: UserContextComponentProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  async function getUserInfo() {
    const userData = await getLocalUserService()

    setUserInfo(userData)
  }

  await getUserInfo()

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
