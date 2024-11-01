export interface ICreateUserDTO {
  name: string
  email: string
  password: string
  driverLicense: string
  isAdmin?: boolean
}
