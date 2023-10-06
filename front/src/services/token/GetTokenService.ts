const TOKEN_KEY = ':rental: [TOKEN]'

export function getTokenService() {
  return localStorage.getItem(TOKEN_KEY)
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}
