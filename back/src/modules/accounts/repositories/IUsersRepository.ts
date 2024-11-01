import { ICreateUserDTO } from '../dtos/User'
import { User } from '../infra/typeorm/entities/User'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail: (email: string) => Promise<User>
  findById: (_id: string) => Promise<User>
  update: (data: User) => Promise<void>
}
