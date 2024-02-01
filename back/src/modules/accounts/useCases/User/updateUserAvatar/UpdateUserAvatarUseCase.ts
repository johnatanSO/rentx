import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from './../../../repositories/Users/IUsersRepository'
import { IUser } from '../../../infra/mongoose/entities/User'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'
import { AppError } from '../../../../../shared/errors/AppError'

interface IRequest {
  userId: string
  avatarImage: {
    originalname: string
    mimetype: string
    buffer: Buffer
  }
}

@injectable()
export class UpdateUserAvatarUseCase {
  usersRepository: IUsersRepository
  storageProvider: IStorageProvider
  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('FirebaseProvider') storageProvider: IStorageProvider,
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
      const [, imageName] = user.avatar.split('appspot.com/')

      if (!imageName) throw new AppError('Nome da imagem inválido')

      await this.storageProvider.deleteImage(imageName)
    }

    const { imageURL } = await this.storageProvider.uploadImage(avatarImage)

    const filters = {
      _id: userId,
    }

    const updateFields = {
      $set: {
        avatar: imageURL,
      },
    }

    await this.usersRepository.update(filters, updateFields)

    return await this.usersRepository.findById(userId)
  }
}
