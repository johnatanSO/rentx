const TOKEN_KEY: string = process.env.TOKEN_KEY as string

export function deleteTokenService() {
  globalThis?.localStorage?.removeItem(TOKEN_KEY)
}
