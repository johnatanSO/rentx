const USER_KEY = process.env.USER_KEY || ''

interface IRequest {
  userData: any
}

export function saveLocalUser({ userData }: IRequest): void {
  globalThis?.localStorage?.setItem(USER_KEY, JSON.stringify(userData))
}
