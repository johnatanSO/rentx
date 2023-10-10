const TOKEN_KEY: string = process.env.TOKEN_KEY as string

export function saveToken(token: string): void {
  globalThis?.localStorage?.setItem(TOKEN_KEY, JSON.stringify(token))
}
