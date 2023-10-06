const tokenKey: string = process.env.TOKEN_KEY as string

export function getTokenService() {
  return localStorage.getItem(tokenKey)
}
