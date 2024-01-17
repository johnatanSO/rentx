import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from './../../../repositories/Users/IUsersRepository'
import { IUser } from '../../../infra/mongoose/entities/User'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'

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
    const user = await this.usersRepository.findById(userId)
    if (user.avatar) {
      // Implementar isso
      await this.storageProvider.deleteImage()
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
