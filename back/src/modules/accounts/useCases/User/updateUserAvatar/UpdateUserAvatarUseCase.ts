import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IUser } from '../../../infra/mongoose/entities/User'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'
import { AppError } from '../../../../../shared/errors/AppError'

interface IRequest {
  userId: string
  avatarImage: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  usersRepository: IUsersRepository
  storageProvider: IStorageProvider
  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('StorageProvider') storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository
    this.storageProvider = storageProvider
  }

  async execute({ userId, avatarImage }: IRequest): Promise<IUser> {
    if (!avatarImage) throw new AppError('Imagem não enviada')
    if (!userId) throw new AppError('_id do usuário não enviado')

    const user = await this.usersRepository.findById(userId)
    if (!user) throw new AppError('Usuário inválido')

    if (user.avatar) {
      await this.storageProvider.deleteImage(user.avatar, 'avatar')
    }

    const path = await this.storageProvider.uploadImage(avatarImage, 'avatar')

    const filters = {
      _id: userId,
    }

    const updateFields = {
      $set: {
        avatar: avatarImage,
        avatarURL: path,
      },
    }

    await this.usersRepository.update(filters, updateFields)

    return await this.usersRepository.findById(userId)
  }
}
