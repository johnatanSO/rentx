import { IUser } from '../../infra/mongoose/entities/User'

export interface ICreateUserDTO {
  name: string
  email: string
  password: string
  driverLicense: string
  isAdmin?: boolean
}

export interface IUsersRepository {
  create: (newUserData: ICreateUserDTO) => Promise<IUser>
  findByEmail: (email: string) => Promise<IUser>
  findById: (_id: string) => Promise<IUser>
  update: (filters: any, updateFields: any) => Promise<void>
  addCarToFavorite: (carId: string, userId: string) => Promise<void>
  removeFavoritedCar: (carId: string, userId: string) => Promise<void>
  list: () => Promise<IUser[]>
}
