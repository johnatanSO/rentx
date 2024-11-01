import { User } from '../../infra/typeorm/entities/User'

export interface IUsersRepository {
  findByEmail: (email: string) => Promise<User>
  findById: (_id: string) => Promise<User>
}
