const TOKEN_KEY = ':rental: [TOKEN]'

export function deleteTokenService() {
  globalThis?.localStorage?.removeItem(TOKEN_KEY)
}
