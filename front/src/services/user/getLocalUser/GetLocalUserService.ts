const USER_KEY = ':user: [INFO]'

export function getLocalUserService() {
  const userLocal = globalThis?.localStorage?.getItem(USER_KEY)
  console.log('userLocal', userLocal)
  if (userLocal) return JSON.parse(userLocal)

  return undefined
}
