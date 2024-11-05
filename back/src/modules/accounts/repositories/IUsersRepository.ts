import { Car } from '../../cars/infra/typeorm/entities/Car'
import { ICreateUserDTO } from '../dtos/User'
import { User } from '../infra/typeorm/entities/User'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail: (email: string) => Promise<User>
  findById: (_id: string) => Promise<User>
  update: (data: User) => Promise<void>
  list: () => Promise<User[]>
  listFavoriteCars: (userId: string) => Promise<Car[]>
}
