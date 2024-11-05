import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { User } from '../../../infra/typeorm/entities/User'

@injectable()
export class ListAllUsersUseCase {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.list()
    return users
  }
}
