import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { AppError } from '../../../../../shared/errors/AppError'
import { User } from '../../../infra/typeorm/entities/User'
import { Car } from '../../../../cars/infra/typeorm/entities/Car'

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

  async execute({ carId, userId }: IRequest): Promise<User> {
    if (!carId) throw new AppError('_id do carro não enviado')

    const user = await this.usersRepository.findById(userId)

    const carAlreadyFavorited = user.favoriteCars.find(
      (favCarId) => favCarId.toString() === carId,
    )

    if (carAlreadyFavorited) {
      user.favoriteCars = user.favoriteCars.filter(
        (car) => car.toString() !== carId,
      )
      await this.usersRepository.update(user)
    } else {
      user.favoriteCars = [...user.favoriteCars, carId as any]
      await this.usersRepository.update(user)
    }

    const updatedUser = await this.usersRepository.findById(userId)

    return updatedUser
  }
}
