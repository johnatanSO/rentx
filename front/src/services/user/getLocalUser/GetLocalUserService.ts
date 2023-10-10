const USER_KEY = process.env.USER_KEY || ''

export function getLocalUserService() {
  const userLocal = globalThis?.localStorage?.getItem(USER_KEY)
  if (userLocal) return JSON.parse(userLocal)

  return undefined
}
