import { IUsersRepository } from './../../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { deleteFile } from '../../../../../utils/file'
import { IUser } from '../../../infra/mongoose/entities/User'

interface IRequest {
  userId: string
  avatarFile: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ userId, avatarFile }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(userId)
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    const filters = {
      _id: userId,
    }

    const updateFields = {
      $set: {
        avatar: avatarFile,
      },
    }

    await this.usersRepository.update(filters, updateFields)
    return await this.usersRepository.findById(userId)
  }
}
