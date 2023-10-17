const TOKEN_KEY = ':rental: [TOKEN]'

export function getTokenService(): string | undefined {
  const token = globalThis?.localStorage?.getItem(TOKEN_KEY)

  if (token) return JSON.parse(token)

  return undefined
}
