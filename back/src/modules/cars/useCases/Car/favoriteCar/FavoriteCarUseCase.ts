import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../../accounts/repositories/Users/IUsersRepository'
import { AppError } from '../../../../../shared/errors/AppError'
import { IUser } from '../../../../accounts/infra/mongoose/entities/User'

interface IRequest {
  carId: string
  userId: string
}

@injectable()
export class FavoriteCarUseCase {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ carId, userId }: IRequest): Promise<IUser> {
    if (!carId) throw new AppError('_id do carro não enviado')

    const user = await this.usersRepository.findById(userId)
    const carAlreadyFavorited = user.favoriteCars.find(
      (car) => car._id.toString() === carId,
    )
    if (carAlreadyFavorited) {
      await this.usersRepository.removeFavoritedCar(carId, userId)
      return
    }

    await this.usersRepository.addCarToFavorite(carId, userId)
    return await this.usersRepository.findById(userId)
  }
}
