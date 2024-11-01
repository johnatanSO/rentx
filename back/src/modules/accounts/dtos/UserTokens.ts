export interface ICreateUserTokenDTO {
  user: string
  expiresDate: Date
  refreshToken: string
}
