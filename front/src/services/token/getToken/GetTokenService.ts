const TOKEN_KEY: string = process.env.TOKEN_KEY as string

export function getTokenService(): string | undefined {
  const token = globalThis?.localStorage?.getItem(TOKEN_KEY)

  if (token) return JSON.parse(token)

  return undefined
}
