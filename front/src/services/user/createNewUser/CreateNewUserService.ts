import http from '@/http/axios'

interface IRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
  driverLicense: string
  isAdmin: boolean
}

export function createNewUserService({
  name,
  email,
  password,
  confirmPassword,
  driverLicense,
  isAdmin,
}: IRequest) {
  return http.post('/users', {
    body: {
      name,
      email,
      password,
      confirmPassword,
      driverLicense,
      isAdmin,
    },
  })
}
