import { Car } from '../../../cars/infra/typeorm/entities/Car'
import { User } from '../../infra/typeorm/entities/User'

export interface ICreateUserDTO {
  name: string
  email: string
  password: string
  driverLicense: string
  isAdmin?: boolean
}

export interface IUsersRepository {
  create: (newUserData: ICreateUserDTO) => Promise<User>
  findByEmail: (email: string) => Promise<User>
  findById: (_id: string) => Promise<User>
  update: (filters: any, updateFields: any) => Promise<void>
  addCarToFavorite: (carId: string, userId: string) => Promise<void>
  removeFavoritedCar: (carId: string, userId: string) => Promise<void>
  list: () => Promise<User[]>
  listFavoriteCars(userId: string): Promise<Car[]>
}
