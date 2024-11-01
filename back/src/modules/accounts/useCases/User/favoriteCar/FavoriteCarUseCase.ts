import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { AppError } from '../../../../../shared/errors/AppError'
import { IUser } from '../../../infra/mongoose/entities/User'

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
      (favCarId) => favCarId.toString() === carId,
    )

    if (carAlreadyFavorited) {
      await this.usersRepository.removeFavoritedCar(carId, userId)
    } else {
      await this.usersRepository.addCarToFavorite(carId, userId)
    }

    const updatedUser = await this.usersRepository.findById(userId)

    return updatedUser
  }
}
