import { ICreateUserDTO, IUsersRepository } from './IUsersRepository'
import { Car } from '../../../cars/infra/typeorm/entities/Car'
import { User } from '../../infra/typeorm/entities/User'

export class TypeOrmUsersRepository implements IUsersRepository {
  create(newUserData: ICreateUserDTO): Promise<User> {}

  findByEmail(email: string): Promise<User> {}

  findById(_id: string): Promise<User> {}

  update(filters: any, updateFields: any): Promise<void> {}

  addCarToFavorit(carId: string, userId: string): Promise<void> {}

  removeFavoritedCar(carId: string, userId: string): Promise<void> {}

  list(): Promise<User[]> {}

  listFavoriteCars(userId: string): Promise<Car[]> {
    throw new Error('Method not implemented.')
  }
}
