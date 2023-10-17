const USER_KEY = ':user: [INFO]'

interface IRequest {
  userData: {
    name: string
    email: string
    isAdmin: boolean
  }
}

export function saveLocalUserService({ userData }: IRequest) {
  globalThis?.localStorage?.setItem(USER_KEY, JSON.stringify(userData))
}
