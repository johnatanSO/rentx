import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IStorageProvider } from '../../../../../shared/container/providers/StorageProvider/IStorageProvider'
import { AppError } from '../../../../../shared/errors/AppError'
import { User } from '../../../infra/typeorm/entities/User'

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

  async execute({ userId, avatarImage }: IRequest): Promise<User> {
    if (!avatarImage) throw new AppError('Imagem não enviada')
    if (!userId) throw new AppError('_id do usuário não enviado')

    const user = await this.usersRepository.findById(userId)
    if (!user) throw new AppError('Usuário inválido')

    if (user.avatar) {
      await this.storageProvider.deleteImage(user.avatar, 'avatar')
    }

    const path = await this.storageProvider.uploadImage(avatarImage, 'avatar')

    user.avatar = avatarImage
    user.avatarURL = path

    await this.usersRepository.update(user)

    return await this.usersRepository.findById(userId)
  }
}
