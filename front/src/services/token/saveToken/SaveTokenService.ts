const TOKEN_KEY = ':rental: [TOKEN]'

export function saveTokenService(token: string) {
  globalThis?.localStorage?.setItem(TOKEN_KEY, JSON.stringify(token))
}
