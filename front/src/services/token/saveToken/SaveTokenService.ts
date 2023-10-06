const tokenKey: string = process.env.TOKEN_KEY as string

export function saveToken(token: string) {
  localStorage.setItem(tokenKey, token)
}
