import { Repository } from 'typeorm'
import { User } from '../../infra/typeorm/entities/User'

export interface IUsersRepository extends Repository<User> {
  findByEmail: (email: string) => Promise<User>
  findById: (_id: string) => Promise<User>
}
