import { IUsersRepository } from './IUsersRepository'
import { User } from '../../infra/typeorm/entities/User'
import { Repository } from 'typeorm'

export class TypeOrmUsersRepository
  extends Repository<User>
  implements IUsersRepository
{
  async findByEmail(email: string): Promise<User> {
    return await this.findOneBy({ email })
  }

  async findById(_id: string): Promise<User> {
    return await this.findOneBy({ _id })
  }
}
