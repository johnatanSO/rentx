const USER_KEY = ':user: [INFO]'

export function deleteLocalUserService() {
  globalThis?.localStorage?.removeItem(USER_KEY)
}
