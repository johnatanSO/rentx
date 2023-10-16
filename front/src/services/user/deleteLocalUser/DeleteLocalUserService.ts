const USER_KEY = process.env.USER_KEY || ''

export function deleteLocalUserService() {
  globalThis?.localStorage?.removeItem(USER_KEY)
}
