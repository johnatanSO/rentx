import { inject, injectable } from 'tsyringe'
import { IUser } from '../../../infra/mongoose/entities/User'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'

@injectable()
export class ListAllUsersUseCase {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.list()
    return users
  }
}
