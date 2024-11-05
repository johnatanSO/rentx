import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { AppError } from '../../../../../shared/errors/AppError'
import { User } from '../../../infra/typeorm/entities/User'

interface IRequest {
  userId: string
  name: string
  email: string
  isAdmin: boolean
}

@injectable()
export class UpdateUserInfosUseCase {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, isAdmin, userId }: IRequest): Promise<User> {
    if (!userId) throw new AppError('_id do usuário não informado')

    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário inválido')

    user.name = name
    user.email = email
    user.isAdmin = isAdmin

    await this.usersRepository.update(user)

    const updatedUser = await this.usersRepository.findById(userId)

    return updatedUser
  }
}
