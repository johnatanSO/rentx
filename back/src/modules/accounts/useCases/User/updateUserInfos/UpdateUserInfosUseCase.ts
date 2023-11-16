import { inject, injectable } from 'tsyringe'
import { IUser } from '../../../infra/mongoose/entities/User'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'

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

  async execute({ name, email, isAdmin, userId }: IRequest): Promise<IUser> {
    await this.usersRepository.update(
      { _id: userId },
      {
        $set: {
          name,
          email,
          isAdmin,
        },
      },
    )

    const updatedUser = await this.usersRepository.findById(userId)

    return updatedUser
  }
}
